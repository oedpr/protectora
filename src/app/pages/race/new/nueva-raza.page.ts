import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { DbService } from '../../../services/db.service';
import { ToastyService } from '../../../services/toasty/toasty.service';

@Component({
  selector: 'app-nueva-raza',
  templateUrl: './nueva-raza.page.html',
  styleUrls: ['./nueva-raza.page.scss'],
})
export class NuevaRazaPage implements OnInit {

  nombre:string;
  imagen:File;

  constructor(private db: DbService,
    private router: Router,
    public toasty: ToastyService,
    public storage: AngularFireStorage) { }

  ngOnInit() {
  }

  async add(){
    let rand = Math.floor(Math.random()*101);

    await this.storage
    .upload(
      `/imagenes/${rand}${this.imagen.name}`,
      this.imagen
    )
    .then(async () => {

      this.storage
        .ref(`/imagenes/${rand}${this.imagen.name}`)
        .getDownloadURL()
        .subscribe(data => {

          this.db.addRaza({
            nombre: this.nombre.toLowerCase(),
            imagen: data,
            fecha: Date.now()
          });

        });    
        this.toasty.msg(3, "Has añadido la raza "+this.nombre);

    })

  }

  close(){
    this.router.navigate(['agregar/'])
  }

}
