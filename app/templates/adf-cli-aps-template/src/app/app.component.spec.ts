import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { CoreModule, TranslateLoaderService } from '@alfresco/adf-core';

import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        })
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
