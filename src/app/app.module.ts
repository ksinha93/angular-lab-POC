import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedData } from './shareddata.service';
import { CustomerOrderComponent } from './customer/customerorder.component';
import { CustomerService } from './services/customer.service';
import { LoginService } from './services/login.service';
import { ElementColorDirective } from './elementColor.directive';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'hello', component: HelloComponent },
  { path: 'custord', component: CustomerOrderComponent },
  { path: '**', component: HelloComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    CustomerOrderComponent,
    ElementColorDirective,
  ],
  bootstrap: [AppComponent],
  providers: [SharedData, CustomerService, LoginService],
})
export class AppModule {}
