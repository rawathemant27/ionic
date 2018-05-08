import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, Loading, ToastController,Events} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {  OtpverifyPage } from '../../pages/otpverify/otpverify';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  obj : any;
  signupForm : FormGroup;
  loading: Loading;

  userData : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthService,  private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public platform: Platform,public eventsCtrl: Events) {


    // Example use of FormBuilder, FormGroups, and FormControls
    this.signupForm = formBuilder.group({
      user_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirmPassword: ['', Validators.required]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')}
   )
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  signupFn(){

    let body = new FormData();
    body.append('name', this.signupForm.value.user_name);
    body.append('email', this.signupForm.value.email);
    body.append('password', this.signupForm.value.password);

    let data_parameters= this.signupForm.value;
    let method='user_signup';
    
    this.loading = this.loadingCtrl.create({
     content: 'Sign up..',
    });

    this.loading.present();
    this.authService.postData(body,method).then((result) => {

    this.obj = result;

    if(this.obj.status=="true"){
      this.loading.dismissAll();
      this.presentToast(this.obj.msg);
      this.userData = this.obj.response;
      localStorage.setItem('loginId', this.userData.user_id);
      this.navCtrl.setRoot(OtpverifyPage);
     }else{
      this.presentToast(this.obj.msg);
      this.loading.dismissAll();
      localStorage.setItem('loginId',"");
     }
     }, (err) => {
     this.loading.dismissAll();
     localStorage.setItem('loginId', "");
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

  gotoLogin(){
    console.log('Login');
    this.navCtrl.push(HomePage);
  }

}
