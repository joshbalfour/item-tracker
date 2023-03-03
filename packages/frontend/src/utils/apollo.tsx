import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache()
})

export const GET_ITEMS = gql`
query Items {
  items {
    id
    name
    description
    children {
      id
      name
      description
    }
  }
}
`

export interface ParentItem extends BaseItem {
  children: BaseItem[]
}

export interface BaseItem {
  id: string
  name: string
  description: string
}
