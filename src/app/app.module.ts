import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBaPAPsQ9fqNAhS-pzKyPj4OLsQlMnjEuk",
    authDomain: "project-1-24b1f.firebaseapp.com",
    databaseURL: "https://project-1-24b1f.firebaseio.com",
    projectId: "project-1-24b1f",
    storageBucket: "project-1-24b1f.appspot.com",
    messagingSenderId: "733772388326",
    appId: "1:733772388326:web:a0310d8b926738f86ee827",
    measurementId: "G-PNC0N7R4PB"
    }),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
