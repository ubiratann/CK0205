import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import { NavComponent } from './components/template/nav/nav.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { ObjectUpdateComponent } from './views/object/object-update/object-update.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ProfileUpdateComponent } from './views/profile/profile-update/profile-update.component';

import { MatMenuModule } from '@angular/material/menu';      
import { MatIconModule } from '@angular/material/icon';      
import { MatDatepickerModule} from '@angular/material/datepicker';      
import { MatSelectModule} from '@angular/material/select';      
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ObjectUpdateComponent,
    ObjectListComponent,
    ProfileUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,      
    MatIconModule,      
    MatDatepickerModule,      
    MatSelectModule,      
    MatSlideToggleModule,
    MatRadioModule,

  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
