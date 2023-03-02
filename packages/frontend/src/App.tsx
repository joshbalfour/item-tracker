import { type SelectTabData, type SelectTabEvent, Tab, TabList, type TabValue, makeStyles } from '@fluentui/react-components'
import { ScanCamera24Regular, DatabaseSearch24Regular } from '@fluentui/react-icons'
import { useState } from 'react'
import Camera from './components/Camera'
import Search from './components/Search'

const useStyles = makeStyles({
  root: { alignItems: 'stretch', display: 'flex'},
  basic: { display: 'block'}
})

const App = (): React.ReactElement => {
  const classes = useStyles()
  const [selectedValue, setSelectedValue] = useState<TabValue>(
    'camera'
  )

  const onTabSelect = (_: SelectTabEvent, data: SelectTabData): void => {
    setSelectedValue(data.value)
  }
  return (
  <div className={classes.root}>
  <TabList vertical selectedValue={selectedValue} onTabSelect={onTabSelect}>
    <Tab value="camera" icon={<ScanCamera24Regular/>}>Scan</Tab>
    <Tab value="search" icon={<DatabaseSearch24Regular/>}>Search</Tab>
  </TabList>
  <>
    {selectedValue === 'camera' && <Camera/>}
    {selectedValue === 'search' && <Search/>}
  </>
  </div>
  )
}

export default App
