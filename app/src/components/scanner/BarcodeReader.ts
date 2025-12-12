import { BrowserMultiFormatReader } from '@zxing/library'

export class BarcodeReader {
  private codeReader: BrowserMultiFormatReader

  constructor() {
    this.codeReader = new BrowserMultiFormatReader()
  }

  async getVideoDevices() {
    return this.codeReader.listVideoInputDevices()
  }

  async startScanning(
    deviceId: string,
    videoElementId: string,
    onResult: (result: string) => void
  ) {
    return this.codeReader.decodeFromVideoDevice(
      deviceId,
      videoElementId,
      (result) => {
        if (result) {
          onResult(result.getText())
        }
      }
    )
  }

  reset() {
    this.codeReader.reset()
  }
}
