import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";
import {Task} from "./models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getLists() {
    return this.webRequestService.get('lists');
  }

  createList(title: string) {
    //Send web request to create List
    //returns an Observable to subscribe to
    return this.webRequestService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    //Send web request to create List
    //returns an Observable to subscribe to
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`)
  }

  createTask(title: string, listId: string) {
    //Send web request to create Task
    //returns an Observable to subscribe to
    return this.webRequestService.post(`lists/${listId}/tasks`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    //Send web request to create List
    //returns an Observable to subscribe to
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  complete(task: Task) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

}
