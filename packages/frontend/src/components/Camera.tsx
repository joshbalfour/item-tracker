import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import { Dropdown } from '@fluentui/react'
let qrScanner: QrScanner | undefined
export default (): JSX.Element => {
  const ref = useRef<HTMLVideoElement>(null)
  const [curCam, setCam] = useState<string>()
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
      console.log('tearing down')
      qrScanner?.destroy()
      qrScanner = undefined
      // }
    }
  }, [ref.current])
  return (
    <>
      {(availCam != null) ? <Dropdown options={availCam.map(c => { return { key: c.id, text: c.label } })} onChange={(_, a) => { setCam(a?.key.toString()) }} defaultSelectedKey={curCam ?? availCam[0].id}/> : <p>Loading Cameras</p>}
      <video style={{ flex: 1 }} ref={ref}></video>
    </>
  )
}
