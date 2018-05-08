import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController, Loading, ToastController} from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AuthService } from '../../providers/auth-service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OtpverifyPage } from '../../pages/otpverify/otpverify';

@IonicPage()
@Component({
  selector: 'page-forgopass',
  templateUrl: 'forgopass.html',
})
export class ForgopassPage {

  obj : any;
  forgotForm : FormGroup;
  loading: Loading;
  userData : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthService,  private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public platform: Platform) {
    
        // Example use of FormBuilder, FormGroups, and FormControls
        this.forgotForm = formBuilder.group({
          email: ['', Validators.required]
        }
       )
  
  }


 forgotFn(){

    let body = new FormData();
    body.append('email', this.forgotForm.value.email);
    let method='forgot_password';
    
    this.loading = this.loadingCtrl.create({
     content: 'Processing..',
    });

    this.loading.present();
    this.authService.postData(body,method).then((result) => {
   
    this.obj = result;
    console.log("Response " + this.obj);
    if(this.obj.status=="true"){
      this.loading.dismissAll();
      this.presentToast(this.obj.msg);
      this.navCtrl.setRoot(HomePage);
     }else{
      this.presentToast(this.obj.Message);
      this.loading.dismissAll();
     }
     
     }, (err) => {
     this.loading.dismissAll();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgopassPage');
  }

  movetootpverify(){
    this.navCtrl.push(OtpverifyPage);
  }

  backlogin(){
    this.navCtrl.setRoot(HomePage);
  }
 

}
