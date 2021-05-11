import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../servicios/db.service';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.page.html',
  styleUrls: ['./razas.page.scss'],
})
export class RazasPage implements OnInit {

  listadoRazas = [];
  listFiltrada = [];
  
  constructor( private db: DbService) { }

  ngOnInit() {
    this.listFiltrada = this.listadoRazas = this.db.getRazas();
  }
  ionViewWillEnter(){
    this.listFiltrada = this.listadoRazas = this.db.getRazas();
  }

  filtrar(esto){
    this.listFiltrada = this.listadoRazas.filter( 
      datos => (datos.nombre).includes(esto) 
    );
  }

}
