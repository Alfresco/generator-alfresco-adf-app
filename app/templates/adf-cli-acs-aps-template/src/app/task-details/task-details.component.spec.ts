import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule } from '@alfresco/adf-core';

import { PreviewService } from '../services/preview.service';
import { TaskDetailsComponent } from './task-details.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessModule.forRoot()
      ],
      declarations: [TaskDetailsComponent],
      providers: [
        PreviewService,
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
