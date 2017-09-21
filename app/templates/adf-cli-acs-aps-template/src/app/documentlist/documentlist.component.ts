import { Component, OnInit } from '@angular/core';
import { ViewerService } from 'ng2-alfresco-viewer';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent implements OnInit {

  constructor(private viewerService: ViewerService) { }

  ngOnInit() {
  }

  showPreview(event) {
    if (event.value.entry.isFile) {
        this.viewerService
            .showViewerForNode(event.value.entry)
            .then(result => {
                console.log(result);
            });
    }
  }

}
