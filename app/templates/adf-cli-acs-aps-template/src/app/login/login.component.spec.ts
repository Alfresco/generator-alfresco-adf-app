import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule, TranslateLoaderService, AppConfigService, AppConfigServiceMock } from '@alfresco/adf-core';
import { LoginComponent } from './login.component';
import { AlfrescoApiService, AlfrescoApiServiceMock } from '@alfresco/adf-core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock }
     ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
