import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-start-task",
  templateUrl: "./start-task.component.html",
  styleUrls: ["./start-task.component.scss"],
})
export class StartTaskComponent {
  constructor(private router: Router) {}

  onTaskStarted(task: any) {
    this.router.navigate(["/community/tasks"]);
  }

  onCancelStartTask() {
    this.router.navigate(["/community/tasks"]);
  }
}
