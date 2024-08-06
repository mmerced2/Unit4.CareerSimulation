const prisma = require('./index')

const createUser = (userData) => {
    return prisma.users.create({
        data: userData,
    })
};

const findUserByUsername = (username) => {
    return prisma.users.findUnique({
        where: {username},
    })
};

const findUserById = (username) => {
    return prisma.users.findUnique({
        where: {username},
    })
}
module.exports = {createUser, findUserByUsername, findUserById};