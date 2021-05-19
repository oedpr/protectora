import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(public db: AngularFirestore) { }

  collection = this.db.collection("perros");

  adopt(id: string){
    this.collection.doc(id).update({adoptado: true});
  }

  delete(id: string){
    this.collection.doc(id).delete();
  }

  async getRaceIdByDogId(id: string){
    let race:string;
    await this.db.collection("perros").doc(id).ref.get().then( (doc) => {
      race = doc.get("raza");
    })
    return race
  }

}
