import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailComponent } from './modules/agency/component/detail/detail.component';
import {MatCardModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './modules/agency/component/search/search.component';
import { EditComponent } from './modules/agency/component/edit/edit.component';
import { HomeComponent } from './modules/agency/component/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {InMemoryDataService} from './modules/agency/service/InMemoryDataService';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    SearchComponent,
    EditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 0 }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
