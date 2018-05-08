import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {PropertyListPage} from '../pages/property-list/property-list';
import {PropertyDetailPage} from '../pages/property-detail/property-detail';
import {BrokerListPage} from '../pages/broker-list/broker-list';
import {BrokerDetailPage} from '../pages/broker-detail/broker-detail';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {AboutPage} from '../pages/about/about';
import {ContactusPage} from '../pages/contactus/contactus';
import {AppointmentPage} from '../pages/appointment/appointment';
import {PortfolioPage} from '../pages/portfolio/portfolio';

import {HomePage} from '../pages/home/home';
import {SignupPage} from '../pages/signup/signup';
import {ForgopassPage} from '../pages/forgopass/forgopass';
import {OtpverifyPage} from '../pages/otpverify/otpverify';
import {ChangepasswordPage} from '../pages/changepassword/changepassword';
import { AuthService } from '../providers/auth-service';

import {PropertyService} from "../providers/property-service-mock";
import {BrokerService} from "../providers/broker-service-mock";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    PropertyListPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage,
    ContactusPage,
    AppointmentPage,
    PortfolioPage,
    HomePage,
    SignupPage,
    ForgopassPage,
    ChangepasswordPage,
    OtpverifyPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AboutPage,
    PropertyListPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage,
    ContactusPage,
    AppointmentPage,
    PortfolioPage,
    HomePage,
    SignupPage,
    ForgopassPage,
    ChangepasswordPage,
    OtpverifyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PropertyService,
    BrokerService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
