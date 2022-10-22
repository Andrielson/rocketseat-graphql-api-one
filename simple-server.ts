import {ApolloServer, gql} from "apollo-server";


const typeDefs = gql`
    type Query {
        users: [String!]!
    }
    
    type Mutation {
        createUser(name: String!): String!
    }
`;

const users: string[] = [];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => users
        },
        Mutation: {
            createUser: (parent, {name}, ctx) => {
                users.push(name);
                return name;
            }
        }
    }
});

server.listen().then(({url}) => {
    console.log(`🚀 HTTP server running on ${url}...`);
});