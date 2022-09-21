import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import initializer, { AppLoadService } from './utils/initializer';
import { GLOBAL, Global } from './global/global';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [AppLoadService],
      multi: true
    },
    { provide: GLOBAL, multi: false, useClass: Global }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
