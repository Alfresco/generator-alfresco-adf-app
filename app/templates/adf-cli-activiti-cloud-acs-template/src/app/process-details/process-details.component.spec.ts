import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ContentModule } from "@alfresco/adf-content-services";
import { ProcessServicesCloudModule } from "@alfresco/adf-process-services-cloud";
import {
  CoreModule,
  AppConfigService,
  AppConfigServiceMock,
  TranslateLoaderService,
} from "@alfresco/adf-core";
import { ProcessDetailsComponent } from "./process-details.component";
import { AlfrescoApiServiceMock, AlfrescoApiService } from "@alfresco/adf-core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

describe("ProcessDetailsComponent", () => {
  let component: ProcessDetailsComponent;
  let fixture: ComponentFixture<ProcessDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessServicesCloudModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderService,
          },
        }),
      ],
      declarations: [ProcessDetailsComponent],
      providers: [
        { provide: AlfrescoApiService, useClass: AlfrescoApiServiceMock },
        { provide: AppConfigService, useClass: AppConfigServiceMock },
      ],
    });
    fixture = TestBed.createComponent(ProcessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeDefined();
  });
});
