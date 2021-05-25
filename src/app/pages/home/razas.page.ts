import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

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
    //this.listFiltrada = this.listadoRazas = this.db.getRazas();
  }
  ionViewWillEnter(){
    //this.listFiltrada = this.listadoRazas = this.db.getRazas();
  }

  filtrar(esto){
    this.listFiltrada = this.listadoRazas.filter( 
      datos => (datos.nombre).includes(esto) 
    );
  }

  ngOnDestroy() {
    // No hay ninguna subcripción. No debería iincluir nada aquí. (?)
  }

}
