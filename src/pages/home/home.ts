import { Component,ViewChild } from '@angular/core';
import { MenuController, IonicPage, Platform, NavController, NavParams, LoadingController, Loading, ToastController,Events} from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ForgopassPage } from '../../pages/forgopass/forgopass';
import {WelcomePage} from '../../pages/welcome/welcome';
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedTheme: String;

  FB_APP_ID: number = 1996170477091090;
  //@ViewChild(Nav) nav: Nav;

  obj : any;
  loginForm : FormGroup;
  loading: Loading;
  userData : any = {};

  fbData :any;
  newData : any;

  constructor( public menu: MenuController, public navCtrl: NavController, public navParams: NavParams,public authService:AuthService,  private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public platform: Platform,public eventsCtrl: Events) {
        //this.fb.browserInit(this.FB_APP_ID, "v2.8");
        // Example use of FormBuilder, FormGroups, and FormControls
        this.loginForm = formBuilder.group({
          user_name: ['', Validators.required],
          password: ['', Validators.required]
        }
       )
  }



  gotoSignup(){
    console.log('Signup');
    this.navCtrl.setRoot(SignupPage);
  }

  movetoforgotpass(){
    this.navCtrl.setRoot(ForgopassPage);
  }

  movetodashboardpage(){
    this.navCtrl.setRoot(WelcomePage);
  }

  signinFn(){

    let body = new FormData();
    body.append('email', this.loginForm.value.user_name);
    body.append('password', this.loginForm.value.password);

    let method='user_login';
    
    this.loading = this.loadingCtrl.create({
     content: 'Log in..',
    });

    this.loading.present();
    this.authService.postData(body,method).then((result) => {
   
    this.obj = result;

    if(this.obj.status=="true"){
      this.loading.dismissAll();
      this.presentToast(this.obj.msg);
      this.userData = this.obj.response;
      localStorage.setItem('userLoginStatus', '1');
      localStorage.setItem('loginId', this.userData.user_id);
      localStorage.setItem('name', this.userData.name);
      localStorage.setItem('loginType', '1');
      this.eventsCtrl.publish('user:created', this.userData.name, Date.now());
      this.menu.enable(true, 'authenticated');
      this.navCtrl.setRoot(WelcomePage);
     }else{
      this.presentToast(this.obj.msg);
      this.loading.dismissAll();
      localStorage.setItem('userLoginStatus', '0');
      localStorage.setItem('name', "");
      localStorage.setItem('loginType', "");
      localStorage.setItem('loginId', "");
     }
     }, (err) => {
     this.loading.dismissAll();
     localStorage.setItem('userLoginStatus', '0');
     localStorage.setItem('loginId', "");
     localStorage.setItem('name', "");
     localStorage.setItem('loginType', "");
      alert('Connection Error');
   });
}


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
