import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";
import {Task} from "../../models/task.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  listId: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
    });
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listId).subscribe((task: Task) => {
      //Navigates to one sublevel before in url (i.e. List view)
      this.router.navigate(['../'], {relativeTo: this.route});
    })
  }
}
