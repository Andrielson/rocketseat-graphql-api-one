import {ApolloServer, gql} from "apollo-server";

interface User {
    id: number;
    name: string;
}

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        createUser(name: String!): User!
    }
`;

const users: User[] = [];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => users
        },
        Mutation: {
            createUser: (_, {name}) => {
                const user = {id: users.length + 1, name};
                users.push(user);
                return user;
            }
        }
    }
});

server.listen().then(({url}) => {
    console.log(`🚀 HTTP server running on ${url}...`);
});