const { extractFragmentReplacements } = require('prisma-binding');
const Query = require('./query');
const Mutation = require('./mutation');
// const Subscription = require('./subscription');
const User = require('./user');

const resolvers = {
    Query,
    Mutation,
    // Subscription,
    User,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

module.exports.fragmentReplacements = fragmentReplacements;
module.exports.resolvers = resolvers;
