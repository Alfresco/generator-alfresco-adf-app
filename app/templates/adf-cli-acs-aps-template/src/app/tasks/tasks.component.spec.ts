import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule, TranslateLoaderService, AppConfigService, AppConfigServiceMock } from '@alfresco/adf-core';

import { TasksComponent } from './tasks.component';
import { AlfrescoApiServiceMock, AlfrescoApiService } from '@alfresco/adf-core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        ProcessModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      declarations: [TasksComponent],
      providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
      ]
    });
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
