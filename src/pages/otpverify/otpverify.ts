import { Component } from '@angular/core';
import { Events, MenuController, AlertController, ViewController, IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../../pages/home/home';
import { WelcomePage } from '../../pages/welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-otpverify',
  templateUrl: 'otpverify.html',
})
export class OtpverifyPage {

  otpPage:any;
  obj : any;
  loading: Loading;
  userData : any;
  constructor(public eventsCtrl: Events, public menu: MenuController, public viewCtrl: ViewController, public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams,public authService:AuthService, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.otpPage = 
    {
         "OTP": "",
    }
  }

  gotolgoinpage(){

    if(this.otpPage.OTP==''){
           let alert = this.alertCtrl.create({
           title: 'Alert!',
           subTitle: 'Please enter OTP',
           buttons: ['OK']
         });
         alert.present();
         return false;
       }
       else{
       let loading = this.loadingCtrl.create({
         content: 'OTP verifying...'
       });
 
       loading.present();

       let body = new FormData();
       body.append('OTP', this.otpPage.OTP);
       body.append('user_id', localStorage.getItem('loginId') );
       let method = "verify_otp";

       this.authService.postData(body,method).then((result) => {
           this.obj = result;
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
 
  }
 
   resendverify(){  
 
     this.loading = this.loadingCtrl.create({
       content: 'Resend OTP..',
      });
 
     this.loading.present();
     let method = "signup/resendverify";
     let data_parameters = {
       "Username":localStorage.getItem('EmailId')
     };
 
     this.authService.postData(data_parameters,method).then((result) => {
         this.obj = result; 
         if(this.obj.ResponseCode==200){
            this.loading.dismissAll();
            this.presentToast(this.obj.Message);
           }else{
            this.presentToast(this.obj.Message);
            this.loading.dismissAll();
           }
 
     }, (err) => {
       console.log("Error " + err);
       this.loading.dismissAll();
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
