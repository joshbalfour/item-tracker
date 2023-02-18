import { Pivot, PivotItem, Stack } from '@fluentui/react'
import Camera from './components/Camera'
import Search from './components/Search'

const App = (): React.ReactElement => (
  <Stack enableScopedSelectors>
    <Stack.Item align="auto">
      <Pivot>
        <PivotItem headerText="Camera" itemIcon="Camera">
          <Camera/>
        </PivotItem>
        <PivotItem headerText="Search" itemIcon="Search">
          <Search/>
        </PivotItem>
      </Pivot>
    </Stack.Item>
  </Stack>
)

export default App
