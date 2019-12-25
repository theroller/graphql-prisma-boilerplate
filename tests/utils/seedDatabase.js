'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../src/prisma');

const users = [
    {
        input: {
            name: 'Jen',
            email: 'jen@example.com',
            password: bcrypt.hashSync('P@ssword!1234', 10),
        },
        user: undefined,
        jwt: undefined,
    },
    {
        input: {
            name: 'Jack',
            email: 'jack@example.com',
            password: bcrypt.hashSync('awesome-BIRD1', 10),
        },
        user: undefined,
        jwt: undefined,
    },
];

async function seedDatabase() {
    // delete test data
    await prisma.mutation.deleteManyUsers();

    // create user one
    users[0].user = await prisma.mutation.createUser({
        data: users[0].input
    });
    users[0].jwt = jwt.sign({ userId: users[0].user.id }, process.env.JWT_SECRET);

    // create user two
    users[1].user = await prisma.mutation.createUser({
        data: users[1].input
    });
    users[1].jwt = jwt.sign({ userId: users[1].user.id }, process.env.JWT_SECRET);
}

module.exports.seedDatabase = seedDatabase;
module.exports.users = users;
