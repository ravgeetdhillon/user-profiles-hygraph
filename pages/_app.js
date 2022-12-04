import { ApolloProvider } from "@apollo/client";
import { client } from "../config/apolloClient";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
