import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DogService } from 'src/app/services/dog/dog.service';
import { DbService } from '../../services/db.service';
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.page.html',
  styleUrls: ['./raza.page.scss'],
})
export class RazaPage implements OnInit, OnDestroy {

  //datos
  nombreRaza = '';
  idRaza = '';

  display = [];
  enAdopcion = [];
  todos = [];

  //subcripciones
  listasPerrosSub:Subscription;
  nombreRazaSub:Subscription;

  constructor(
      private activatedRoute: ActivatedRoute,
      private db: DbService,
      private raceService: RaceService,
      private dogService: DogService
    ) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idRaza = paramMap.get('IdRaza');
    })

    this.nombreRazaSub = this.raceService.getRaceNameById(this.idRaza).subscribe( data => {
      this.nombreRaza = data["nombre"];
    });

  }

  ionViewWillEnter(){
     
    this.listasPerrosSub = this.dogService.getDogsByRace(this.idRaza).subscribe( 
      data => {
        this.display = this.todos = data;
        this.enAdopcion = this.todos.filter(perro => perro.adoptado==false);
      }
    );
    
  }

  swap(){
    this.display = (this.display == this.todos) ? this.enAdopcion : this.todos;
  }

  ngOnDestroy(){

    if (this.nombreRazaSub){
      this.nombreRazaSub.unsubscribe();
    }

  }
}
