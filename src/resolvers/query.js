const utilGetUserId = require('../utils/getUserId');
const { SECRET } = require('../utils/generateToken');

const getUserId = (request, requireAuth) => utilGetUserId(request, SECRET, requireAuth);

const Query = {
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.query.user({ where: { id: userId } }, info);
    },
    users(parent, args, { prisma }, info) {
        const opArgs = {
            after: args.after,
            first: args.first,
            orderBy: args.orderBy,
            skip: args.skip,
        };
        if (args.query) {
            opArgs.where = {
                OR: [
                    { name_contains: args.query },
                ]
            };
        }

        return prisma.query.users(opArgs, info);
    },
};

module.exports = Query;
