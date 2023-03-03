import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { FluentProvider, makeStyles, webDarkTheme } from '@fluentui/react-components'
import ReactDOM from 'react-dom/client'
import App from './App'
import { client } from './utils/apollo'
import './main.css'

const useStyles = makeStyles({
  root: { alignItems: 'stretch', display: 'flex', flexBasis: '100%'}
})

const Fuck = () => {
  const classes = useStyles()
  return (
    <React.StrictMode>
    <ApolloProvider client={client}>
    <FluentProvider theme={webDarkTheme} className={classes.root}>
        <App />
      </FluentProvider>
    </ApolloProvider>
  </React.StrictMode>
  )
}



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Fuck/>)
