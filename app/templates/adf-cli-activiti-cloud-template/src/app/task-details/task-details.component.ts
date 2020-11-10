import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
})
export class TaskDetailsComponent implements OnInit {
  taskId: string = null;
  fileShowed: any = null;
  content: any = null;
  contentName: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["taskId"]) {
        this.taskId = params["taskId"];
      }
    });
  }
}
