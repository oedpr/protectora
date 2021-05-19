import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db.service';
import { RaceService } from '../../services/race/race.service';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.page.html',
  styleUrls: ['./raza.page.scss'],
})
export class RazaPage implements OnInit {

  nombreRaza = '';
  idRaza = '';
  display = [];
  todos = [];
  enAdopcion = [];

  constructor(
      private activatedRoute: ActivatedRoute,
      private db: DbService,
      private raceService: RaceService
    ) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idRaza = paramMap.get('IdRaza');
    })

    this.nombreRaza = (await this.raceService.getRaceNameById(this.idRaza)).toString();
  }

  ionViewWillEnter(){
    
    this.display = this.todos = this.db
    .getPerrosByRaza(this.idRaza);

    this.enAdopcion = this.db
    .getPerrosByRazaSinAdoptar(this.idRaza);
  }

  swap(display){
    this.display = 
      (display == this.todos) ? this.enAdopcion : this.todos;
  }

}
