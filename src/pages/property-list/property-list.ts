import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {PropertyService} from '../../providers/property-service-mock';
import {PropertyDetailPage} from '../property-detail/property-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-property-list',
    templateUrl: 'property-list.html'
})
export class PropertyListPage {

    markersGroup;
    myForm: FormGroup;
    userInfo: {name: string, email: string, subject: string, message : string} = {name: '', email: '', subject: '', message : ''};

    constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public service: PropertyService, public config: Config) {

    }

    ngOnInit(): any {
        this.myForm = this.formBuilder.group({
          'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
          'subject': ['', Validators.required],
          'message': ['', Validators.required],
          'email': ['', [Validators.required, this.emailValidator.bind(this)]]
        });
      }
    
      onSubmit() {
        console.log('submitting form');
      }
    
      isValid(field: string) {
        let formField = this.myForm.get(field);
        return formField.valid || formField.pristine;
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
