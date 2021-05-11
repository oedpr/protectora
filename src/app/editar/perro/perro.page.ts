import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-perro',
  templateUrl: './perro.page.html',
  styleUrls: ['./perro.page.scss'],
})
export class PerroPage implements OnInit {

  listaRazas = [];
  nombreRaza = '';
  id = '';
  idRaza = '';

  original = {};

  nombre:string;
  descripcion:string;
  imagen:File;
  raza:string;

  constructor(private db: DbService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.nombre = paramMap.get('Nombre');
      this.nombreRaza = paramMap.get('NombreRaza');
      this.id = paramMap.get('Id');
      this.idRaza = paramMap.get('IdRaza');
    })

    this.original = await this.db.getPerro(this.id);

    this.listaRazas = this.db.getRazas();

  }

  actualizar(){
    console.log(this.nombre, this.descripcion);
    this.db.updPerro(this.id,(
      (this.raza != undefined) ?
      {
        nombre: this.nombre,
        raza:  this.raza,
        descripcion: this.descripcion,
        fecha: Date.now()
      }
      :{
        nombre: this.nombre,
        //no incluyo la raza,
        descripcion: this.descripcion,
        fecha: Date.now()
      })
    )
    this.router.navigate(['raza/'+((true) ? this.nombreRaza : this.nombre)+'/'+this.idRaza+'/'+this.nombre+'/'+this.id])
  }

}
