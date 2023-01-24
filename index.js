const {ApolloServer} = require("apollo-server");
const { Products,categories,reviews} = require("./db");
const {typeDefs} = require('./schema');
const {Query} = require('./Query');
const {Category} = require("./Category");
const {Product} = require("./Product");
const {Mutation} = require('./Mutation')
//String, Float, Int, Boolean, ID


const server = new ApolloServer({
    typeDefs, resolvers:{
        Query,Category,Product,Mutation
    },
    context:{
        Products,
        categories,
        reviews
    }
});


server.listen().then(({url}) => {
    console.log(`server is ready at ${url}`)
})