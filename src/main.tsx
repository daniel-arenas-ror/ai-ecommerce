import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from "@apollo/client/react";

import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { CompanyProvider } from './context/CompanyContext.tsx'

const client = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_BACKEND_URL + '/graphql',
    credentials: 'include',
  }),
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
