const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

require('dotenv').config({ path: 'variables.env' });
const Consignment = require('./models/Consignment');
const Transporter = require('./models/Transporter');

mongoose
.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
)
.then(() => console.log('MONGO_DB connected'))
.catch(err => console.error(err));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        Consignment,
        Transporter
    }
});

server.listen().then(({ url }) => {
    console.log(`SERVER LISTENING ON: ${url}`);
});