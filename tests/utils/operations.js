const { default: gql } = require('graphql-tag');

const createUser = gql`
    mutation($data: CreateUserInput!) {
        createUser(data: $data) {
            token,
            user {
                id
                name
                email
            }
        }
    }
`;
const getUsers = gql`
    query {
        users {
            id
            name
            email
        }
    }
`;
const login = gql`
    mutation($data: LoginUserInput!) {
        login(data: $data){
            token
            user {
                name
            }
        }
    }
`;
const me = gql`
    query {
        me {
            id
            name
            email
        }
    }
`;

module.exports = {
    createUser,
    getUsers,
    login,
    me,
};
