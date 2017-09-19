import { Component, OnInit } from '@angular/core';
import { ObjectDataTableAdapter } from 'ng2-alfresco-datatable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  data = new ObjectDataTableAdapter(
    // data
    [
      { id: 1, name: 'Name 1' },
      { id: 2, name: 'Name 2' }
    ],
    // schema
    [
      {
        type: 'text',
        key: 'id',
        title: 'Id',
        sortable: true
      },
      {
        type: 'text',
        key: 'name',
        title: 'Name',
        cssClass: 'full-width',
        sortable: true
      }
    ]
  );

  constructor() { }

  ngOnInit() {
  }

}
