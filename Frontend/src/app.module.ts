import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';  // ✅ Replace HttpClientModule with this

import { AppComponent } from './app.component';
import { TestGeneratorComponent } from './test-generator/test-generator.component';
import { TestResultsComponent } from './test-results/test-results.component';

@NgModule({
  declarations: [
    AppComponent,
    TestGeneratorComponent,
    TestResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
   
  ],
  providers: [
    provideHttpClient(),  // ✅ Add this to enable HTTP functionality
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }