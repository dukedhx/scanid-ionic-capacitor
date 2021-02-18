import { Injectable } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { workerParams } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OcrService {
  private worker = createWorker({
    workerPath: '/assets/tesseract/worker.min.js',
    langPath: '/assets/lang',
    corePath: '/assets/tesseract/tesseract-core.wasm.js',
    //  logger: m => console.log(m),
  });
  private init = new Promise(async (resolve, reject) => {
    try {
      await this.worker.load();
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');
      await this.worker.setParameters(workerParams);
      resolve(true);
    } catch (ex) {
      resolve(ex);
    }
  });

  async recognizeFromBase64(base64: string, rectangle?: any) {
    const initResult = await this.init;
    if (initResult !== true) throw initResult;
    const {
      data: { text },
    } = await this.worker.recognize(base64, { rectangle });
    return text;
  }
}
