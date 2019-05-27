import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  createNewList() {
    this.taskService.createList('Testing').subscribe((response: any) => {
      console.log(response);
    })
  }

}
