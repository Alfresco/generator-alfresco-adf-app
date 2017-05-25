<%- licenseHeader %>

import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlfrescoSettingsService, LogService, StorageService } from 'ng2-alfresco-core';

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.css']
})
export class SettingsComponent {

    HOST_REGEX: string = '^(http|https):\/\/.*[^/]$';

    ecmHost: string;
    bpmHost: string;
    urlFormControlEcm = new FormControl('', [Validators.required, Validators.pattern(this.HOST_REGEX)]);
    urlFormControlBpm = new FormControl('', [Validators.required, Validators.pattern(this.HOST_REGEX)]);

    constructor(private settingsService: AlfrescoSettingsService,
                private storage: StorageService,
                private logService: LogService) {
        this.ecmHost = storage.getItem('ecmHost') || this.settingsService.ecmHost;
        this.bpmHost = storage.getItem('bpmHost') || this.settingsService.bpmHost;
    }

    public onChangeECMHost(event: KeyboardEvent): void {
        let value = (<HTMLInputElement>event.target).value.trim();
        if (value && this.isValidUrl(value)) {
            this.logService.info(`ECM host: ${value}`);
            this.ecmHost = value;
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
            this.storage.setItem(`bpmHost`, value);
        } else {
            console.error('Bpm address does not match the pattern');
        }
    }

    isValidUrl(url: string) {
        return /^(http|https):\/\/.*/.test(url);
    }

}
