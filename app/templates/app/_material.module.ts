<%- licenseHeader %>

import { NgModule } from '@angular/core';
import { MdDialogModule, MdInputModule, MdSelectModule, MdSlideToggleModule } from '@angular/material';

const MATERIAL_MODULES = [
    MdSlideToggleModule,
    MdInputModule,
    MdSelectModule,
    MdDialogModule
];

@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class MaterialModule {}
