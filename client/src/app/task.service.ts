import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string) {
    //Send web request to create List
    //returns an Observable to subscribe to
    return this.webRequestService.post('lists', { title });
  }
}
