import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@fluentui/react'
import { initializeIcons } from '@fluentui/react/lib/Icons'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { client } from './utils/apollo'

initializeIcons()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
)
