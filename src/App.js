import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./layout/protected";
import { Provider } from "react-redux";
import { client, authClient } from "./apolloClient";
import store from "./store/store";
import Login from "./pages/login";
import Home from "./pages/index";
import Register from "./pages/register";
import Users from "./pages/auth/user";
import Products from "./pages/auth/product";
import DetailProduct from "./pages/auth/product-detail";
import DetailUser from "./pages/auth/user-detail";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {/* Public Routes (Tanpa Auth, Pakai client) */}
        <ApolloProvider client={client}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ApolloProvider>

        {/* Protected Routes (Dengan Auth, Pakai authClient) */}
        <ApolloProvider client={authClient}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/users" element={<Users />} />
                <Route path="/users/create" element={<DetailUser />} />
                <Route path="/users/:id" element={<DetailUser />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/create" element={<DetailProduct />} />
                <Route path="/products/:id" element={<DetailProduct />} />
              </Route>
            </Route>
          </Routes>
        </ApolloProvider>
      </Router>
    </Provider>

    // <ApolloProvider client={authClient}>
    //   <Provider store={store}>
    //     <Router>
    //       <Routes>
    //         <Route path="/" element={<Login />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route
    //           element={
    //             <ProtectedRoute>
    //               <ApolloProvider client={authClient} />
    //             </ProtectedRoute>
    //           }
    //         >
    //           <Route element={<Layout />}>
    //             <Route path="/users" element={<Users />} />
    //             <Route path="/users/create" element={<DetailUser />} />
    //             <Route path="/users/:id" element={<DetailUser />} />
    //             <Route path="/product" element={<Products />} />
    //             <Route path="/product/create" element={<DetailProduct />} />
    //             <Route path="/product/:id" element={<DetailProduct />} />
    //           </Route>
    //         </Route>
    //       </Routes>
    //     </Router>
    //   </Provider>
    // </ApolloProvider>
  );
};

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import { gql, useQuery } from "@apollo/client";

// const ME_QUERY = gql`
//   query Me {
//     me {
//       username
//     }
//   }
// `;

// export default function App() {
//   const { data, error } = useQuery(ME_QUERY);

//   if (error) return <p>Unauthorized</p>;

//   return <h1>Welcome, {data?.me.username}</h1>;
// }
