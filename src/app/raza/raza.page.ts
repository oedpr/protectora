import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../servicios/db.service';

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
      private router: Router
    ) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.nombreRaza = paramMap.get('NombreRaza');
      this.idRaza = paramMap.get('IdRaza');
    })
    
    this.display = this.todos = this.db
      .getPerrosByRaza(this.idRaza);

    this.enAdopcion = this.db
      .getPerrosByRazaSinAdoptar(this.idRaza);
  }

  ionViewWillEnter(){
    // actualiza las listas
    this.display = this.todos = this.db
    .getPerrosByRaza(this.idRaza);

    this.enAdopcion = this.db
    .getPerrosByRazaSinAdoptar(this.idRaza);
  }

  swap(display){
    this.display = 
      (display == this.todos) ? this.enAdopcion : this.todos;
  }

  setImagen(foto){
    sessionStorage.setItem('foto', foto);
  }

  close(){
    this.router.navigate(['razas/'])
  }

}
