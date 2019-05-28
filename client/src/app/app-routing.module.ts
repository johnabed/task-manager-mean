import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskViewComponent} from "./pages/task-view/task-view.component";
import {NewListComponent} from "./pages/new-list/new-list.component";
import {NewTaskComponent} from "./pages/new-task/new-task.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {EditListComponent} from "./pages/edit-list/edit-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'edit-list/:listId', component: EditListComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
