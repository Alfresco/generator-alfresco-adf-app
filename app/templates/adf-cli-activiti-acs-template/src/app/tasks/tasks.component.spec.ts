import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessServicesCloudModule } from '@alfresco/adf-process-services-cloud';
import { CoreModule } from '@alfresco/adf-core';
import { TasksComponent } from './tasks.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessServicesCloudModule
      ],
      declarations: [TasksComponent],
      providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
