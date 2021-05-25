import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import formatRelative from 'date-fns/formatRelative';
import { es } from 'date-fns/locale'

  
@Injectable({
  providedIn: 'root'
})
export class DbService {

  perros: Observable<any[]>;

  constructor(public db: AngularFirestore,
    private route: Router) { 
    this.perros = db.collection('perros').valueChanges();
  }

  getRazas(){
    return this.db.collection("razas").valueChanges();
  }

  getRaza(id: string): Promise<{}> {
    return new Promise((resolve) => {
      this.db.collection("razas").doc(id)
      .valueChanges().subscribe(raza => {
        resolve(raza);
      })
    })
  }

  updRaza(id: string, cambios:{}){
    this.db.collection("razas")
    .doc(id)
    .update(cambios);
  }

  updPerro(id: string, cambios:{}){
    this.db.collection("perros")
    .doc(id)
    .update(cambios);
  }

  getPerrosByRaza(raza: string){
    let arr = [];
    console.log(raza)
    this.db.collection("perros").ref
    .where("raza", "==", raza)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
    });
    return arr;
  }

  getPerrosByRazaSinAdoptar(raza: string){
    let arr = [];
    this.db.collection("perros").ref
    .where("raza", "==", raza)
    .where("adoptado", "==", false)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        });
    });
    return arr;
  }

  getPerro(id: string): Promise<{}> {
    return new Promise((resolve) => {
      this.db.collection("perros").doc(id)
      .valueChanges().subscribe(perro => {
        resolve(perro);
      })
    })
  }
  
/*
  adoptarPerro(id: string){
    this.db.collection("perros")
    .doc(id)
    .update({adoptado: true});
  }

  delPerro(id: string){
    this.db.collection("perros").doc(id).delete()
      .then(() => {
        console.log(`Perro con id ${id} borrado.`);
    });
  }
  */

  async create(data: any): Promise<any> {
    await this.db
      .collection("perros")
      .add(data)
      .then((doc) => {
        this.db.doc(`perros/${doc.id}`).update({ id: doc.id });
      });
  }

  getFecha(id: string): Promise<string> {
    return new Promise((resolve) => {
      this.db.collection("perros").doc(id)
      .valueChanges().subscribe(perro => {
        resolve(
          formatRelative( 
            perro["fecha"],
            Date.now(),
            { locale: es})
        );
      })
    })
  }


  async addRaza(data: any): Promise<any> {
    await this.db
      .collection("razas")
      .add(data)
      .then((doc) => {
        this.db.doc(`razas/${doc.id}`).update({ id: doc.id });
        this.route.navigate(['/raza/'+data.nombre])
      });
    
  }

}
