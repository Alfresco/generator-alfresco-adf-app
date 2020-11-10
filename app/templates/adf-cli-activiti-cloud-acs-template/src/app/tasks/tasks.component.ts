import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  TaskListCloudSortingModel,
  ProcessListCloudSortingModel,
} from "@alfresco/adf-process-services-cloud";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent {
  taskListSorting = [
    new TaskListCloudSortingModel({
      orderBy: "createdDate",
      direction: "DESC",
    }),
  ];
  processListSorting = [
    new ProcessListCloudSortingModel({
      orderBy: "lastModified",
      direction: "DESC",
    }),
  ];

  constructor(private router: Router) {}

  onTaskRowClick(taskId: string) {
    if (taskId) {
      this.router.navigate(["/community/tasks", taskId]);
    }
  }

  onProcessRowClick(processId: string) {
    if (processId) {
      this.router.navigate(["/community/processes", processId]);
    }
  }
}
