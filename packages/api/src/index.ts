import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { RecipeResolver } from "./resolvers/recipe.resolver"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'


const start = async () => {
    const schema = await buildSchema({
        resolvers: [RecipeResolver]
    })
    
    const server = new ApolloServer({
        schema: schema
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    })
    console.log(`🚀  Server ready at: ${url}`);
}

start().then(() => console.log("done"))


