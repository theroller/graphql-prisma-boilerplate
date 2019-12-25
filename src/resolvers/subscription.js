// const utilGetUserId = require('../utils/getUserId');
// const { SECRET } = require('../utils/generateToken');

// const getUserId = (request, requireAuth) => utilGetUserId(request, SECRET, requireAuth);

const Subscription = {
    // comment: {
    //     subscribe(parent, { postID }, { prisma }, info) {
    //         return prisma.subscription.comment({
    //             where: { node: { post: { id: postID } } }
    //         }, info);
    //     }
    // },
};

module.exports = Subscription;
