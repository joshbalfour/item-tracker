import { useQuery } from '@apollo/client'

import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell
} from '@fluentui/react-components'
import { GET_ITEMS, type ParentItem } from '../utils/apollo'

export default (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_ITEMS)
  if (loading) return <p>Loading</p>
  if (error != null) return <h1>:(</h1>
  console.log(data)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell key={'name'}>
            Name
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.items.map((item: ParentItem) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.name}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}
