import { Injectable } from '@angular/core';
import {WebWorkerService as WebWorker } from './hello.worker';

@Injectable()
export class WebWorkerService extends WebWorker {
}
