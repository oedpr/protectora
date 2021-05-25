import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(public db: AngularFirestore) { }


  getRazas(){
    return this.db.collection("razas").valueChanges();
  }


  //observable
  getRaceNameById(id: string){
   return this.db.doc(`razas/${id}`).valueChanges();
  }

  /*
  //promesa
  async getRaceNameByIdPromesa(id: string){
    return new Promise<string>(async (resolve, reject) => {
      const nombre = (await this.db.firestore.doc(`razas/${id}`).get()).data().nombre;
      resolve(nombre);
    })
  }

  //promesa
  async getRaceNameByIdPromesaCollection(id: string){
    let array = [];
    return new Promise<object[]>(async (resolve, reject) => {
      (await this.db.firestore.collection("razas").get()).forEach(doc => {
        array.push(doc.data());
      });
      resolve(array);
    })
  }
  */
  

}
