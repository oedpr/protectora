import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(public db: AngularFirestore,
              public router: Router) { }

  collection = this.db.collection("perros");

  adopt(id: string){
    this.collection.doc(id).update({adoptado: true});
  }

  delete(id: string){
    this.collection.doc(id).delete()
      .then(() => { 
        this.router.navigate(['/raza/', this.getRaceIdByDogId(id)]); 
      });
  }

  getRaceIdByDogId(id: string){
    return "7AXaPsLFGwUNBDRJltHJ" //siempre redirige a gatoperro (cambiar)
  }

}
