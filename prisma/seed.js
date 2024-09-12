const { PrismaClient } = require('@prisma/client');
const { albumsArray } = require('./albums_data');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const main = async () => {
    await prisma.$connect();

    // Clear existing data
    console.log('Clearing existing data...');
    const deleteComments = prisma.products.deleteMany();
    const deleteReviews = prisma.reviews.deleteMany();
    const deleteProducts = prisma.products.deleteMany();
    const deleteUsers = prisma.users.deleteMany();
    await prisma.$transaction([deleteReviews,deleteComments,deleteProducts,deleteUsers]);

    // Seed users
    console.log('Creating users...');
    const users = await Promise.all(
        [...Array(3)].map(() =>
            prisma.users.create({
                data: {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    email: faker.internet.email(),
                    first_name: faker.person.firstName(),
                    last_name: faker.person.lastName(),
                    phone_number: faker.phone.number(),
                    street_address: faker.location.streetAddress(true),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    zip_code: faker.location.zipCode(),
                    country_code: faker.location.countryCode(),
                },
            })
        )
    );
    console.log('Created users:', users);

    // Seed products using albumsArray
    console.log('Creating products...');
    await Promise.all(
        users.map(user =>
            Promise.all(
                albumsArray.map(album =>
                    prisma.products.create({
                        data: {
                            name: album.name,
                            product_type: album.product_type,
                            description: album.description,
                            img_url: album.img_url,
                            category: album.category,
                            artist: album.artist,
                            user_id: user.id, // Assign user ID from the list of users
                        },
                    })
                )
            )
        )
    );

    const products = await prisma.products.findMany();
    console.log('Created products:', products);

    // Generate reviews
    console.log('Generating reviews...');
    const reviews = await Promise.all(
        products.map(product =>
            prisma.reviews.create({
                data: {
                    rating: faker.number.float({ min: 1, max: 5 }),
                    text: faker.lorem.sentences({ min: 2, max: 5 }),
                    user_id: users[Math.floor(Math.random() * users.length)].id, // Random user ID
                    product_id: product.id,
                },
            })
        )
    );
    console.log('Generated reviews:', reviews);

    // Generate comments
    console.log('Generating comments...');
    const comments = await Promise.all(
        reviews.map(review =>
            prisma.comments.create({
                data: {
                    text: faker.lorem.sentences({ min: 2, max: 5 }),
                    user_id: users[Math.floor(Math.random() * users.length)].id, // Random user ID
                    review_id: review.id,
                },
            })
        )
    );
    console.log('Generated comments:', comments);

    await prisma.$disconnect();
};

main().catch(async (err) => {
    console.error('ERROR:', err);
    await prisma.$disconnect();
});