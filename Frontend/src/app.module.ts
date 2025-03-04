import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TestGeneratorComponent } from './test-generator/test-generator.component';  // ✅ Import this
import { TestResultsComponent } from './test-results/test-results.component';  // ✅ Import this

@NgModule({
  declarations: [
    AppComponent,
   
    TestGeneratorComponent,  // ✅ Declare this component
    TestResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, 
    ReactiveFormsModule,
  
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
