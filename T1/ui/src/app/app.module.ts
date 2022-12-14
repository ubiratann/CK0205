import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog'

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { InterceptorService } from './utils/interceptor/interceptor.service';

import { AppComponent } from './app.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ObjectUpdateComponent } from './views/object/object-update/object-update.component';
import { LogoutComponent } from './components/template/logout/logout.component';
import { UserListComponent } from './views/user/user-list/user-list.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { UserSigninComponent } from './views/user/user-signin/user-signin.component';
import { UserUpdateComponent } from './views/user/user-update/user-update.component';
import { ObjectValidateComponent } from './views/object/object-validate/object-validate.component';
import { UserObjectsComponent } from './views/user/user-objects/user-objects.component';
import { UserReportsComponent } from './views/user/user-reports/user-reports.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ObjectUpdateComponent,
    ObjectListComponent,
    LogoutComponent,
    UserListComponent,
    UserLoginComponent,
    UserSigninComponent,
    UserUpdateComponent,
    ObjectValidateComponent,
    UserObjectsComponent,
    UserReportsComponent,
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
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
