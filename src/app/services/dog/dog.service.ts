import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(public db: AngularFirestore) { }

  collection = this.db.collection("perros");

  async create(data: any): Promise<any> {
    await this.collection.add(data)
      .then((doc) => {
        this.db.doc(`perros/${doc.id}`).update({ id: doc.id });
      });
  }

  adopt(id: string){
    this.collection.doc(id).update({adoptado: true});
  }

  delete(id: string){
    this.collection.doc(id).delete();
  }

  getDogsByRace(raza: string){
    return this.db.collection("perros", ref => ref.where("raza", "==", raza)).valueChanges();
  }

}
