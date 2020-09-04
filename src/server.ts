import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import mongoose from 'mongoose';

interface IServer{
    typeDefs: typeof typeDefs;
    resolvers: typeof resolvers;
}

function startServer(args : IServer ){
    const typeDefs = args.typeDefs;
    const resolvers = args.resolvers;
    mongoose.connect('mongodb+srv://josethz00:fljtjvle@devcluster.u6g0p.mongodb.net/graphql?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const server = new ApolloServer({ typeDefs, resolvers });
    server.listen().then(({ url }) => console.log(`Server started at ${url}`));
}

export default startServer;