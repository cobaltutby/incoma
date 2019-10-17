import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
  MatCheckboxModule,
  // MatChipsModule,
  MatDatepickerModule,
  // MatNativeDateModule,
  // MatDialogModule,
  // MatExpansionModule,
  MatFormFieldModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatPaginatorModule,
  // MatProgressBarModule,
  MatProgressSpinnerModule,
  // MatRadioModule,
  MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule,
  // MatStepperModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Material

    //MatDateFormats,
    // MatAutocompleteModule,
    MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    MatCheckboxModule,
    // MatChipsModule,
    MatDatepickerModule,
    //MatNativeDateModule,
    // MatDialogModule,
    // MatExpansionModule,
    MatFormFieldModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    MatProgressSpinnerModule,
    // MatRadioModule,
    MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatStepperModule


  ],
  entryComponents: [
  ],

  providers: [
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
