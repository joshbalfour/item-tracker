import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import { Dropdown, makeStyles, Option } from '@fluentui/react-components'
import { Card, CardFooter, CardPreview } from '@fluentui/react-components/unstable'

const useStyles = makeStyles({
  root: { alignItems: 'stretch', display: 'flex' },
  basic: { display: 'block' }
})

let qrScanner: QrScanner | undefined
export default (): JSX.Element => {
  const classes = useStyles()
  const ref = useRef<HTMLVideoElement>(null)
  const [curCam, setCam] = useState<string>()
  const [hasLoaded, setLoaded] = useState<boolean>(false)
  const [availCam, setAvailCam] = useState<QrScanner.Camera[]>()

  if (availCam == null) {
    void QrScanner.listCameras(true).then(cams => {
      setAvailCam(cams)
    })
  }
  useEffect(() => {
    if ((qrScanner != null) && curCam !== undefined) { void qrScanner.setCamera(curCam) }
  }, [curCam])

  useEffect(() => {
    if ((ref.current != null) && (qrScanner == null)) { qrScanner = new QrScanner(ref.current, (result: QrScanner.ScanResult) => { alert(result.data) }, { highlightScanRegion: true, preferredCamera: curCam }); void qrScanner.start() }
    return () => {
      // if ((ref.current != null) && (qrScanner != null)) {
      console.log(hasLoaded)
      if (hasLoaded) {
        console.log('tearing down')
        qrScanner?.destroy()
        qrScanner = undefined
      }
      // }
    }
  }, [ref.current, hasLoaded])
  return (
    <Card className={classes.basic}>
      <CardPreview>
        <video onPlay={() => { console.log('lol'); setLoaded(true) }} style={{ flex: 1 }} ref={ref}></video>
      </CardPreview>
      <CardFooter>
        {(availCam != null) ? <Dropdown onOptionSelect={(_, a) => { console.log(a); setCam(a?.optionValue) }} defaultValue={availCam[0].label} defaultSelectedOptions={[curCam ?? availCam[0].id]}> {availCam.map(c => (<Option key={c.id} value={c.id}>{c.label}</Option>))}  </Dropdown> : <p>Loading Cameras</p>}
      </CardFooter>
    </Card>
  )
}
