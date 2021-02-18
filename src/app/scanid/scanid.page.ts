import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CameraService,
  CameraServiceOptions,
} from '../shared/services/camera.service';
import { OcrService } from '../shared/services/ocr.service';

import { all as getIDInfo } from 'js-idcard';
@Component({
  selector: 'app-scanid',
  templateUrl: './scanid.page.html',
  styleUrls: ['./scanid.page.scss'],
})
export class ScanidPage implements AfterViewInit, OnDestroy {
  buttonText = 'capture';

  @ViewChild('canvas') private canvas: ElementRef;

  constructor(
    private cameraservice: CameraService,
    private ocrservice: OcrService
  ) {}

  ngAfterViewInit() {
    setTimeout(
      () =>
        this.cameraservice.startPreview({
          [CameraServiceOptions.CameraPosition]:
            CameraServiceOptions.CameraRear,
        }),
      500
    );
  }

  ngOnDestroy() {
    //this.ocrservice.terminate()
    this.cameraservice.stopPreview();
  }

  async start() {
    this.buttonText = 'processing';
    try {
      let result = await this.ocrNId(await this.cameraservice.capture());
      if (result.length == 18) {
        const idinfo = getIDInfo(result);
        result = `${idinfo.address.address}\n${idinfo.birthDay.date}\n${idinfo.sex}`;
      } else result = 'Failed - text recognized:\n' + result;
      alert(result);
    } catch (ex) {
      alert(ex.message);
    }
    this.buttonText = 'capture';
  }

  async ocrNId(base64: string) {
    //if(!Capacitor.isNative){

    // const img = new Image();
    // img.src = base64

    //   const iw = img.width;
    //       const ih = img.height;
    //
    //   this.canvas.nativeElement.width = ih;
    //   this.canvas.nativeElement.height = iw;
    //
    //   const ctx = this.canvas.nativeElement.getContext('2d');
    //
    //   ctx.save();
    //   ctx.translate(img.width,0);
    //
    //     ctx.scale(-1,1);
    // ctx.drawImage(img,0,0);
    // ctx.restore();
    // base64 = this.canvas.nativeElement.toDataURL()
    //}
    const text = await this.ocrservice.recognizeFromBase64(base64, {
      top: 300,
      left: 100,
      width: 1000,
      height: 500,
    });
    return (/\d{18}/.exec(text.trim()) || [])[0] || text;
  }
}
