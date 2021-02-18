import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { CameraPreview } = Plugins;
import { CameraPreviewOptions } from '@capacitor-community/camera-preview';

export enum CameraServiceOptions {
  CameraPosition = 'position',
  ContainerId = 'parent',
  CameraFront = 'front',
  CameraRear = 'rear',
}

const defaultCaptureConfig = { width: 768, height: 1024 };

const defaultConfig = {
  [CameraServiceOptions.ContainerId]: 'content',
  [CameraServiceOptions.CameraPosition]: CameraServiceOptions.CameraFront,
  toBack: true,
};

@Injectable({ providedIn: 'root' })
export class CameraService {
  startPreview(cameraServiceOptions?: any) {
    CameraPreview.start({ ...defaultConfig, ...cameraServiceOptions });
  }

  stopPreview() {
    CameraPreview.stop();
  }

  async capture(cameraServiceOptions?: any) {
    const result = await CameraPreview.capture({
      ...defaultCaptureConfig,
      ...cameraServiceOptions,
    });
    return 'data:image/png;base64,' + result.value;
  }
}
