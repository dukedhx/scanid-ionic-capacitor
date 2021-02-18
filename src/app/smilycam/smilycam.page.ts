import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { CameraService } from '../shared/services/camera.service';
import { FacerecService } from '../shared/services/facerec.service';

@Component({
  selector: 'app-smilycam',
  templateUrl: './smilycam.page.html',
  styleUrls: ['./smilycam.page.scss'],
})
export class SmilycamPage implements AfterViewInit, OnDestroy {
  started = false;
  outputs = [];
  buttonText = 'stop';
  constructor(
    private facerecservice: FacerecService,
    private cameraservice: CameraService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.start(), 500);
  }

  ngOnDestroy() {
    this.started = false;
    this.cameraservice.stopPreview();
  }

  async start() {
    this.started
      ? this.cameraservice.stopPreview()
      : this.cameraservice.startPreview();
    this.started = !this.started;
    this.buttonText = this.started ? 'stop' : 'start';
    const capture = async () => {
      if (this.started) {
        try {
          this.outputs = [
            await this.facerecservice.detectExpressionBase64(
              await this.cameraservice.capture()
            ),
            ...this.outputs,
          ];
          setTimeout(capture, 1000);
        } catch (ex) {
          this.outputs = [ex.toString()];
          this.buttonText = 'start';
        }
      }
    };

    this.started && setTimeout(capture, 3000);
  }
}
