const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {faker} = require('@faker-js/faker');

const main = async () => {
    await prisma.$connect();
    //seed 5 users
    console.log("Creating Users")
    const [user1, user2, user3, user4, user5] = await Promise.all(
        [...Array(5)].map(() => {
           return prisma.users.create({
                data: {
                    username: faker.internet.userName(),
                    password: faker.internet.password(),
                    email: faker.internet.email(),
                    first_name: faker.person.firstName() ,
                    last_name: faker.person.lastName() ,
                },
            });
        })
    );
   const users = await prisma.users.findMany();
    console.log("created users:", users)

    console.log("Creating Products")
    await Promise.all([user1,user2,user3,user4,user5].map((user) =>
        [...Array(5)].map(async () => {
            await prisma.products.create({
                 data: {
                     name: "Pink Disco Balloon Garland",
                     product_type: "Balloons",
                     description: "132pcs Hot Pink White Latex Balloons Garland Arch Kit for Princess Theme Birthday Party Scene Decor Arrangement",
                     img_url: "https://i5.walmartimages.com/seo/Beyondtrade-132pcs-Hot-Pink-White-Latex-Balloons-Garland-Arch-Kit-for-Princess-Theme-Birthday-Party-Scene-Decor-Arrangement_e820d813-afda-4570-88af-fadec1a2d477.798222b008518e49caaf3d5c8b8655d1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF" ,
                     user_id: user.id
                 },
             });
         })
    
    ) );

   const products = await prisma.products.findMany();
   console.log("created products:", products);


    console.log("Generating reviews");
    //   can remove review1, review2, etc if you include the findMany
      const [review1, review2, review3] = await Promise.all(
        [...Array(3)].map(( _, i) => {
          return prisma.reviews.create({
            data: {
              rating: faker.number.float({ min: 1, max: 5 }),
              text: faker.lorem.sentences({ min: 2, max: 5 }),
              user_id: users[i].id,
              product_id: products[i].id,
            },
          });
        })
      );
      const reviews = await prisma.reviews.findMany();
     console.log("generated reviews:", reviews);


     console.log("Generating comments");
      const [comment1, comment2, comment3] = await Promise.all(
        [...Array(3)].map(( _, i) => {
          return prisma.comments.create({
            data: {
              text: faker.lorem.sentences({ min: 2, max: 5 }),
              user_id: users[i].id,
              review_id: reviews[i].id,
            },
          });
        })
      );
      const comments = await prisma.comments.findMany();
      console.log("generated comments:", comments);

};

main().then(async ()=> {
    await prisma.$disconnect()
}).catch( async(err) => {
    console.log(`ERROR: ${err}`);
    await prisma.$disconnect()
})