import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-raza',
  templateUrl: './raza.page.html',
  styleUrls: ['./raza.page.scss'],
})
export class RazaPage implements OnInit {

  idRaza = '';
  nombreRaza = '';
  id = '';
  nombre:string;
  imagen:File;

  raza = {};

  constructor( private db : DbService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  async ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.nombreRaza = this.nombre = paramMap.get('NombreRaza');
      this.idRaza = paramMap.get('IdRaza');
      this.id = paramMap.get('Id');
    })

    this.raza = await this.db.getRaza(this.idRaza);
  }

  actualizar(){
    console.log(this.nombre, this.imagen)

    this.db.updRaza(this.idRaza,{
      nombre: this.nombre.toLowerCase()
    })

    this.router.navigate(['/raza/'+this.nombreRaza+'/'+this.idRaza])
  }

}
