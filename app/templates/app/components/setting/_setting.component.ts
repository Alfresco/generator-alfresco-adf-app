<%- licenseHeader %>

import { Component } from '@angular/core';
import { AlfrescoSettingsService, StorageService } from 'ng2-alfresco-core';

@Component({
  selector: 'alfresco-setting-demo',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {

  ecmHost: string;
  bpmHost: string;

  constructor(public alfrescoSettingsService: AlfrescoSettingsService,
              private storage: StorageService) {
    this.ecmHost = this.alfrescoSettingsService.ecmHost;
    this.bpmHost = this.alfrescoSettingsService.bpmHost;
  }

  public onChangeECMHost(event: KeyboardEvent): void {
    console.log((<HTMLInputElement>event.target).value);
    this.ecmHost = (<HTMLInputElement>event.target).value;
    this.alfrescoSettingsService.ecmHost = this.ecmHost;
    this.storage.setItem(`ecmHost`, this.ecmHost);
  }

  public onChangeBPMHost(event: KeyboardEvent): void {
    console.log((<HTMLInputElement>event.target).value);
    this.bpmHost = (<HTMLInputElement>event.target).value;
    this.alfrescoSettingsService.bpmHost = this.bpmHost;
    this.storage.setItem(`bpmHost`, this.bpmHost);
  }

}
