import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(public db: AngularFirestore) { }



  getRaceNameById(){
    
  }

}
