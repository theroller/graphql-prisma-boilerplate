const utilGetUserId = require('../utils/getUserId');
const { SECRET } = require('../utils/generateToken');

const getUserId = (request, requireAuth) => utilGetUserId(request, SECRET, requireAuth);

const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { request }) {
            const userId = getUserId(request, false);
            if (userId && userId === parent.id) {
                return parent.email;
            }

            return null;
        }
    },
};

module.exports = User;
