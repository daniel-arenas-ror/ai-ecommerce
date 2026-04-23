import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";

import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { CompanyProvider } from './context/CompanyContext.tsx'
import { useSearchParams } from 'react-router-dom';

const authLink = new SetContextLink(({ headers }) => {
  const token = localStorage.getItem("token");
  const searchParams = new URLSearchParams(window.location.search);
  const version = searchParams.get('version') || 'published';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      'X-Company-Version': version,
    },
  };
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL + '/graphql',
  credentials: 'include',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <CompanyProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </CompanyProvider>
    </StrictMode>
  </ApolloProvider>
)
