<%- licenseHeader %>

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ObjectDataTableAdapter } from 'ng2-alfresco-datatable';

@Component({
    selector: 'about-page',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    data: ObjectDataTableAdapter;

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.http.get('/versions.json').subscribe(response => {
            var regexp = new RegExp("^(ng2-activiti|ng2-alfresco|alfresco-)", 'g');

            var alfrescoPackages = Object.keys(response.json().dependencies).filter(function (val) {
                console.log(val);
                return regexp.test(val);
            });

            let  alfrescoPackagesTableRappresentation = [];
            alfrescoPackages.forEach((val)=> {
                console.log(response.json().dependencies[val]);
                alfrescoPackagesTableRappresentation.push({name:val,version:response.json().dependencies[val].version});
            });

            console.log(alfrescoPackagesTableRappresentation);

            this.data = new ObjectDataTableAdapter(alfrescoPackagesTableRappresentation, [
                {type: 'text', key: 'name', title: 'Name', sortable: true},
                {type: 'text', key: 'version', title: 'Version', sortable: true}
            ]);
        });

    }
}
