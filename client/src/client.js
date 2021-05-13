import { InMemoryCache, ApolloClient, gql, ApolloLink, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"


/**
 * Create a new apollo client and export as default
 */

const http = new HttpLink({ uri: "http://localhost:4000" })
const delay = setContext(
    request => new Promise((success, fail) => {
        setTimeout(() => {
            success()
        }, 1600)
    })
)

const link = ApolloLink.from([
    delay,
    http
])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    
})

export default client