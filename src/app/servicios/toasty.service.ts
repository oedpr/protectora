import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastyService {

  constructor( public toastController: ToastController) { }
  
  async msg(sec:number, txt:string) {
    const toast = await this.toastController.create({
      message: txt,
      duration: sec*1000
    });
    toast.present();
  }
}
