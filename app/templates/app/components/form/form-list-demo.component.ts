

import { Component, ViewChild } from '@angular/core';
import { FormModel, FormService } from 'ng2-activiti-form';
import { ActivitiForm } from 'ng2-activiti-form';

@Component({
    selector: 'form-list-demo',
    template: `
        <adf-form-list [forms]="formList" (row-dblclick)="onRowDblClick($event)">
        </adf-form-list>
        <div class="form-container" *ngIf="!isEmptyForm()">
            <adf-form [form]="form" [data]="restoredData">
            </adf-form>
        </div>
        <button md-button (click)="store()" color="primary">{{'FORM-LIST.STORE' | translate }}</button>
        <button md-button (click)="restore()" color="primary">{{'FORM-LIST.RESTORE' | translate }}</button>
    `,
    styles: [`
        .form-container {
            padding: 10px;
        }

        .store-form-container{
            width: 80%;
            height: 80%;
        }
    `]
})
export class FormListDemoComponent {

    @ViewChild(ActivitiForm)
    activitiForm: ActivitiForm;

    formList: any [] = [];

    form: FormModel;
    formId: string;

    storedData: any = {};
    restoredData: any = {};

    constructor(private formService: FormService) {
        // Prevent default outcome actions
        formService.executeOutcome.subscribe(e => {
            e.preventDefault();
            console.log(e.outcome);
        });
    }

    onRowDblClick(event: CustomEvent) {
        let rowForm = event.detail.value.obj;

        this.formService.getFormDefinitionById(rowForm.id).subscribe((formModel) => {
            let form = this.formService.parseForm(formModel.formDefinition);
            this.form = form;
        });

        console.log(rowForm);
    }

    isEmptyForm() {
        return this.form === null || this.form === undefined;
    }

    store() {
        this.clone(this.activitiForm.form.values, this.storedData);
        console.log('DATA SAVED');
        console.log(this.storedData);
        console.log('DATA SAVED');
        this.restoredData = null;
    }

    clone(objToCopyFrom, objToCopyTo) {
        for (let attribute in objToCopyFrom) {
            if (objToCopyFrom.hasOwnProperty(attribute)) {
                objToCopyTo[attribute] = objToCopyFrom[attribute];
            }
        }
        return objToCopyTo;
    }

    restore() {
        this.restoredData = this.storedData;
        this.storedData = {};
    }

}
