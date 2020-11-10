import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-process-details",
  templateUrl: "./process-details.component.html",
  styleUrls: ["./process-details.component.css"],
})
export class ProcessDetailsComponent implements OnInit {
  processId: string = null;
  fileShowed: any = null;
  content: any = null;
  contentName: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["processId"]) {
        this.processId = params["processId"];
      }
    });
  }
}
