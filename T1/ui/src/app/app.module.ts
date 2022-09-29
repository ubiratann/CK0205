import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './components/template/nav/nav.component';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './views/home/home.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ObjectUpdateComponent } from './views/object/object-update/object-update.component';
import { ProfileUpdateComponent } from './views/profile/profile-update/profile-update.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InterceptorService } from './utils/interceptor/interceptor.service';

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
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
