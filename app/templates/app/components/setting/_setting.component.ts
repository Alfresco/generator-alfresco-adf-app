<%- licenseHeader %>

import { Component, AfterViewChecked } from '@angular/core';
import { AlfrescoSettingsService, StorageService, LogService } from 'ng2-alfresco-core';

declare var componentHandler: any;

@Component({
    selector: 'alfresco-setting-demo',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
})
export class SettingComponent implements AfterViewChecked {

    ecmHost: string;
    bpmHost: string;

    constructor(private settingsService: AlfrescoSettingsService,
                private storage: StorageService,
                private logService: LogService) {
        this.ecmHost = this.settingsService.ecmHost;
        this.bpmHost = this.settingsService.bpmHost;
    }

    ngAfterViewChecked() {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
        }
    }

    public onChangeECMHost(event: KeyboardEvent): void {
        let value = (<HTMLInputElement>event.target).value.trim();
        if (value && this.isValidUrl(value)) {
            this.logService.info(`ECM host: ${value}`);
            this.ecmHost = value;
            this.settingsService.ecmHost = value;
            this.storage.setItem(`ecmHost`, value);
        } else {
            console.error('Ecm address does not match the pattern');
        }
    }

    public onChangeBPMHost(event: KeyboardEvent): void {
        let value = (<HTMLInputElement>event.target).value.trim();
        if (value && this.isValidUrl(value)) {
            this.logService.info(`BPM host: ${value}`);
            this.bpmHost = value;
            this.settingsService.bpmHost = value;
            this.storage.setItem(`bpmHost`, value);
        } else {
            console.error('Bpm address does not match the pattern');
        }
    }

    isValidUrl(url: string) {
        return /^(http|https):\/\/.*/.test(url);
    }

}
