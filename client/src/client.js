import { InMemoryCache, ApolloClient, gql } from "@apollo/client"

/**
 * Create a new apollo client and export as default
 */

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache()
})

export default client