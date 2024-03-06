import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // Remove AppComponent from declarations array
  ],
  imports: [
    BrowserModule,
    // Import AppComponent here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
