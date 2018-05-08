import { Injectable } from '@angular/core';
import { Http , RequestOptions , Headers} from '@angular/http';
import 'rxjs/Rx';
import * as Constants from '../app/app.const';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AuthService { 
  
    itemspartners : any;
    labelAttribute = "name";


    constructor(public http : Http) {
      console.log('Hello AuthService Provider');
    }

    postData(data_parm,method) {
     return new Promise((resolve, reject) => {
     
         var headers = new Headers();
        //  headers.append("Accept", 'application/json');
        //  headers.append('Content-Type', 'application/x-www-form-urlencoded' );
         let options = new RequestOptions({ headers: headers });


        this.http.post(Constants.API_URL+method,data_parm,options)
           .subscribe(res => {
             resolve(res.json());
           }, (err) => {
             reject(err);
         });

     });

   }


  getData(url) {
   return new Promise((resolve, reject) => {
   
       var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       let options = new RequestOptions({ headers: headers });


      this.http.get(url,options)
         .subscribe(res => {
           resolve(res.json());
         }, (err) => {
           reject(err);
       });

   });

 }



     postData2(data_parm,method) {
     return new Promise((resolve, reject) => {
     
       var headers = new Headers();
         //headers.append("Accept", 'application/json');
         // headers.append('Content-Type', 'application/json' );
         let options = new RequestOptions({ headers: headers });


        this.http.post(method,data_parm,options)
           .subscribe(res => {
             resolve(res.json());
           }, (err) => {
             reject(err);
         });

     });

   }


  getData2(data_parm,url) {
   return new Promise((resolve, reject) => {
   
       var headers = new Headers();
       headers.append("Accept", 'application/json');
       headers.append('Content-Type', 'application/json' );
       let options = new RequestOptions({ headers: headers });


      this.http.get(url,options)
         .subscribe(res => {
           resolve(res.json());
         }, (err) => {
           reject(err);
       });

   });

 }


 



}
