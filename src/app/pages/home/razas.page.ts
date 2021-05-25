import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RaceService } from 'src/app/services/race/race.service';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.page.html',
  styleUrls: ['./razas.page.scss'],
})

export class RazasPage implements OnInit, OnDestroy {

  //datos
  listadoRazas = [];
  listFiltrada = [];

  //subscripciones
  listadosSub:Subscription;
  
  constructor( 
    private raceService: RaceService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.listadosSub = this.raceService.getRazas().subscribe( data => {
      this.listFiltrada = this.listadoRazas = data;
    });

  }

  filtrar(esto){
    this.listFiltrada = this.listadoRazas.filter( 
      datos => (datos.nombre).includes(esto) 
    );
  }

  ngOnDestroy() {

    if (this.listadosSub){
      this.listadosSub.unsubscribe();
    }

  }

}
