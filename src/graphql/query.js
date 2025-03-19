import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProduct($search: String!) {
    getAllProducts(search: $search) {
      id
      name
      price
      stock
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      stock
    }
  }
`;
