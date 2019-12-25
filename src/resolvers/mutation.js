const bcrypt = require('bcrypt');
const utilGetUserId = require('../utils/getUserId');
const generateToken = require('../utils/generateToken');
const { SECRET } = generateToken;
const hashPassword = require('../utils/hashPassword');

const getUserId = (request) => utilGetUserId(request, SECRET);

const Mutation = {
    async createUser(parent, { data }, { prisma }) {
        const password = await hashPassword(data.password);
        const user = await prisma.mutation.createUser({
            data: {
                ...data,
                password,
            } });

        return {
            user,
            token: generateToken(user.id)
        };
    },
    deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    },
    async login(parent, { data }, { prisma }) {
        const user = await prisma.query.user({ where: { email: data.email } });
        if (!user) {
            throw new Error('login failed');
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error('login failed');
        }

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async updateUser(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request);

        if (typeof data.password === 'string') {
            data.password = await hashPassword(data.password);
        }
        return prisma.mutation.updateUser({ where: { id: userId }, data }, info);
    },
};

module.exports = Mutation;
