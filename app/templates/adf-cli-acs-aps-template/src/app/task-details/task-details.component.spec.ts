import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule, TranslateLoaderService } from '@alfresco/adf-core';

import { PreviewService } from '../services/preview.service';
import { TaskDetailsComponent } from './task-details.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CoreModule.forRoot(),
        ProcessModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      declarations: [TaskDetailsComponent],
      providers: [
        PreviewService,
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
