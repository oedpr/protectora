import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(public db: AngularFirestore) { }

  async getRaceNameById(id: string){
    let name:string;
    await this.db.collection("razas").doc(id).ref.get().then( (doc) => {
      name = doc.get("nombre");
    })
    return name //usar .toString() en página
  }

}
