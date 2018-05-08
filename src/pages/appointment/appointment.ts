import { Component } from '@angular/core';
import { Config, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
/**
 * Generated class for the AppointmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  markersGroup;
  myForm: FormGroup;
  userInfo: {name: string, email: string, subject: string, message : string} = {name: '', email: '', subject: '', message : ''};

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public config: Config) {

  }

  ngOnInit(): any {
      this.myForm = this.formBuilder.group({
        'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
        'subject': ['', Validators.required],
        'message': ['', Validators.required],
        'email': ['', [Validators.required, this.emailValidator.bind(this)]]
      });
    }


      nameValidator(control: FormControl): {[s: string]: boolean} {
        if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
          return {invalidName: true};
        }
      }
    
      phoneValidator(control: FormControl): {[s: string]: boolean} {
        if (control.value !== '') {
          if (!control.value.match('\\(?\\d{3}\\)?-? *\\d{3}-? *-?\\d{4}')) {
            return {invalidPhone: true};
          }
        }
      }
    
      emailValidator(control: FormControl): {[s: string]: boolean} {
        if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
          return {invalidEmail: true};
        }
      }
}
