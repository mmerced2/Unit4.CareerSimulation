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

const findUserById = (id,userData) => {
    return prisma.users.findUnique({
        where: {id},
        data: userData
    })
}

// const getUserData = ()
module.exports = {createUser, findUserByUsername, findUserById};