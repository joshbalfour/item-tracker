import { useQuery } from '@apollo/client'
import { DetailsRow, GroupedList, type IColumn } from '@fluentui/react'
import { GET_ITEMS } from '../utils/apollo'

const columns: IColumn[] = [
  {
    key: 'name',
    name: 'name',
    minWidth: 500,
    maxWidth: 500,
    onRender: (item) => <span>{item.name}</span>
  }
]

const renderCell = (nestingDepth?: number,
  item?,
  itemIndex?: number): React.ReactNode => {
  return <DetailsRow columns={columns}
    groupNestingDepth={nestingDepth}
    item={item}
    itemIndex={itemIndex!}/>
}

export default (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_ITEMS)
  if (loading) return <p>Loading</p>
  if (error != null) return <h1>:(</h1>
  console.log(data)

  return (
        <GroupedList items={data.items} onRenderCell={renderCell}/>
  )
}
