import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, Events, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AppointmentPage} from '../pages/appointment/appointment';
import {PropertyListPage} from '../pages/property-list/property-list';
import {BrokerListPage} from '../pages/broker-list/broker-list';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import {BrokerDetailPage} from '../pages/broker-detail/broker-detail';
import {ContactusPage} from '../pages/contactus/contactus';
import {PortfolioPage} from '../pages/portfolio/portfolio';
import {HomePage} from '../pages/home/home';
import {SignupPage} from '../pages/signup/signup';
import {ChangepasswordPage} from '../pages/changepassword/changepassword';
import {OtpverifyPage} from '../pages/otpverify/otpverify';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})

export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    appMenuItems: Array<MenuItem>;
    accountMenuItems: Array<MenuItem>;
    user_namenav : any;
    constructor(public menu: MenuController,public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
       
        this.initializeApp();

        /// unauthorized
        this.appMenuItems = [
            {title: 'Home', component: WelcomePage, icon: 'home'},
            {title: 'About Me', component: AboutPage, icon: 'flag'},
            {title: 'Reach me', component: PropertyListPage, icon: 'contact'},
            {title: 'Portfolio', component: PortfolioPage, icon: 'apps'},
            {title: 'Appointment', component: AppointmentPage, icon: 'bookmarks'},
            {title: 'Login', component: HomePage, icon: 'lock'},
            {title: 'Sign Up', component: SignupPage, icon: 'lock'},
        ];

        // authorized
        this.accountMenuItems = [
            {title: 'Home', component: WelcomePage, icon: 'home'},
            {title: 'About Me', component: AboutPage, icon: 'flag'},
            {title: 'Reach me', component: PropertyListPage, icon: 'contact'},
            {title: 'Portfolio', component: PortfolioPage, icon: 'apps'},
            {title: 'Appointment', component: AppointmentPage, icon: 'bookmarks'},
            {title: 'My Account', component: BrokerDetailPage, icon: 'people'},
            {title: 'Change Password', component: ChangepasswordPage, icon: 'log-out'},
            {title: 'Logout', component: '', icon: 'log-out'},
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            
              if((localStorage.getItem('userLoginStatus') === "undefined" || localStorage.getItem('userLoginStatus') === '0') ) {
                this.user_namenav= '';
               } else {
                this.user_namenav=localStorage.getItem('name');
              }
               
              
              if(localStorage.getItem('userLoginStatus') === '1' ){
                  this.menu.enable(true, 'authenticated');
                  this.menu.enable(false, 'unauthenticated');
                  this.rootPage = WelcomePage;
              } else{
                  this.menu.enable(false, 'authenticated');
                  this.menu.enable(true, 'unauthenticated');
                  this.rootPage = HomePage;
              }
        
              this.events.subscribe('user:created', (user, time) => {
                this.user_namenav=user;
              });

             this.statusBar.styleLightContent();
             this.splashScreen.hide();
        });
    }

    openPage(page) {
        if(page.title == "Logout" )
            this.doLogout();
        else
            this.nav.setRoot(page.component);
    }


    doLogout(){
        localStorage.clear();
        this.nav.setRoot(WelcomePage);
        this.menu.enable(false, 'authenticated');
        this.menu.enable(true, 'unauthenticated');
      }
}
