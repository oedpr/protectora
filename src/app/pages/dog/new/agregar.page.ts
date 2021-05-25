import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { DbService } from '../../../services/db.service';
import { ToastyService } from '../../../services/toasty/toasty.service';
import { RaceService } from 'src/app/services/race/race.service';
import { Subscription } from 'rxjs';
import { DogService } from 'src/app/services/dog/dog.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit, OnDestroy {

  //datos
  listaRazas = [];

  //formulario
  nombre='';
  descripcion='';
  imagen:File;
  raza:string;
  url:string;

  //subscripciones
  listaRazasSub:Subscription;

  constructor( private db: DbService,
              private dogService: DogService,
              private raceService: RaceService,
              public toasty: ToastyService,
              public storage: AngularFireStorage,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

  async ionViewDidEnter(){

    this.listaRazasSub = this.raceService.getRazas().subscribe( data => {
    this.listaRazas = data;

  });

    this.raza = this.activatedRoute.snapshot.params.IdRaza;
    //this.nombreRaza = await this.raceService.getRaceNameByIdPromesa(this.raza);
    //this.nombreRaza = (await this.raceService.getRaceNameByIdPromesa(this.idRaza)).data().nombre;
    //this.nombreRaza = this.raceService.getRaceNameByIdPromesa(this.idRaza);
    //console.log(await this.raceService.getRaceNameByIdPromesaCollection(this.idRaza))
    
  }

  async agregar(){
    let rand = Math.floor(Math.random()*101);

    await this.storage
    .upload(
      `/fotos/${rand}${this.imagen.name}`,
      this.imagen
    )
    .then(async () => {

      const subcripcion:Subscription = this.storage
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
        subcripcion.unsubscribe();

    })
  }

  ngOnDestroy(){

    if(this.listaRazasSub){
      this.listaRazasSub.unsubscribe();
    }

  }

}
