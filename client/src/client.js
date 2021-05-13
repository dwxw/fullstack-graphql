import { InMemoryCache, ApolloClient, gql } from "@apollo/client"

/**
 * Create a new apollo client and export as default
 */

const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
})

const query = gql`
    {
        characters {
            results {
                name
                id
            }
        }
    }
`

client.query({query}).then(result => console.log(result))

export default client