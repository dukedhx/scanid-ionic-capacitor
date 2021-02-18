import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';
const minConfidence = 0.9;

export enum Expressions {
  Happy = 'happy',
  Sad = 'sad',
  Neutral = 'neutral',
  Surprised = 'surprised',
  NotDetectd = '',
}

@Injectable({ providedIn: 'root' })
export class FacerecService {
  private faceapiOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });
  private loadWeights = new Promise(async (resolve, reject) => {
    try {
      await faceapi.nets.ssdMobilenetv1.load('/assets/weights');
      await faceapi.loadFaceExpressionModel('/assets/weights');
      resolve(true);
    } catch (ex) {
      resolve(ex);
    }
  });

  async detectExpressionBase64(base64: string) {
    if (base64) {
      const image = new Image();
      image.src = base64;
      return this.detectExpression(image);
    }
    return Expressions.NotDetectd;
  }

  async detectExpression(img: HTMLImageElement) {
    const loadResult = await this.loadWeights;
    if (loadResult !== true) throw loadResult;
    const detection = await faceapi
      .detectSingleFace(img, this.faceapiOptions)
      .withFaceExpressions();
    const expressions = detection.expressions || {};
    const expression = Object.keys(expressions)
      .map((k) => [k, expressions[k]])
      .sort((a, b) => b[1] - a[1])[0];
    return expression.length ? expression[0] : Expressions.NotDetectd;
  }
}
