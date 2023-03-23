import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserComponent } from './user/user.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {LayoutModule} from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import {ApiRequestService} from 'src/app/services/api-request.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    UserComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [ApiRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
