import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      //Now redirect to /lists/response._id
    })
  }

}
