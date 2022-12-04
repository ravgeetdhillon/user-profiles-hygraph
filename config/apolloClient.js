// 1
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// 2
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_CONTENT_API_ENDPOINT,
});

// 3
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_PERMANENTAUTH_TOKEN}`,
    },
  };
});

// 4
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
