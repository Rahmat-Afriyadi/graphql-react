import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const httpLinkAuth = createHttpLink({
  uri: "http://localhost:8080/graphql/auth",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  link: httpLinkAuth,
  cache: new InMemoryCache(),
});
