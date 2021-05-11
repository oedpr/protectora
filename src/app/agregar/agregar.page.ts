import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { DbService } from '../servicios/db.service';
import { ToastyService } from '../servicios/toasty.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  listaRazas = [];

    nombre:string;
    descripcion:string;
    imagen:File;
    raza:string;
    url:string;

  constructor( private db: DbService,
              private router: Router,
              public toasty: ToastyService,
              public storage: AngularFireStorage) { }

  ngOnInit() {
    this.listaRazas = this.db.getRazas();
  }

  ionViewDidEnter(){
    this.listaRazas = this.db.getRazas();
  }

  async crear(){
    let rand = Math.floor(Math.random()*101);

    await this.storage
    .upload(
      `/fotos/${rand}${this.imagen.name}`,
      this.imagen
    )
    .then(async () => {

      this.storage
        .ref(`/fotos/${rand}${this.imagen.name}`)
        .getDownloadURL()
        .subscribe(data => {

          this.db.create({
            nombre: this.nombre,
            descripcion: this.descripcion,
            foto: data,
            fecha: Date.now(),
            adoptado: false,
            raza: this.raza,
          });

        });    
        this.toasty.msg(3, "Has añadido "+this.nombre+ " a la lista." );

    })
  }

  close(){
    this.router.navigate(['/razas'])
  }

}
