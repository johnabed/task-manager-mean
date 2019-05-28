import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute,
              private router: Router) { }

  listId: string;
  taskId: string;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params.listId && params.taskId) {
        this.listId = params.listId;
        this.taskId = params.taskId;
      }
      else {
        console.error("NO LIST&TASK ID PROVIDED SOS");
      }
    });
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }

}
