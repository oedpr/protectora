import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from '../servicios/db.service';
import { Router } from '@angular/router';
import { ToastyService } from '../servicios/toasty.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  nombre = '';
  nombreRaza = '';
  id = '';
  idRaza = '';
  perro = {};
  fecha = '';

  constructor(
    private activatedRoute : ActivatedRoute,
    public alertController : AlertController,
    private db : DbService,
    private router : Router,
    private toasty : ToastyService) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.nombre = paramMap.get('Nombre');
      this.nombreRaza = paramMap.get('NombreRaza');
      this.id = paramMap.get('Id');
      this.idRaza = paramMap.get('IdRaza');
    })

    this.perro = await this.db.getPerro(this.id);
    this.fecha = await this.db.getFecha(this.id);
  }

  async borrar() {
    //si mi condición es true
    if (true) {
      // muestra confirmación en forma de popup modal
      const confirmacion = await this.confirmar();
      // romper aquí si se presiona cancelar
      if (!confirmacion) return;
    }

    // confirmado: sigue el código.
    this.db.delPerro(this.id);
    // muestra mensaje, tras borrarse.
    this.toasty.msg(3,"Acabas de borrar a "+this.nombre);
    // redirigir a pagina de razas
    this.router.navigate(['/raza/'+this.nombreRaza]);
  }

  async confirmar() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Eliminar a '+this.nombre,
        message: 'Se eliminará de forma permanente.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Eliminar',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async adoptar() {
    console.log("Adoptado: "+this.nombre+" ("+this.nombreRaza+")");
    this.db.adoptarPerro(this.id);
    this.ngOnInit();
  }

  async mensaje() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Gracias por adoptar a '+this.nombre,
        message: 'Contactaremos contigo enviándote un correo electrónico facilitándote los documentos necesarios e indicándote los siguientes pasos para la adopción.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  comprobar(email){
    let boton = document.getElementById('boton');
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    boton.setAttribute( 'disabled', (re.test(email) ? 'false' : 'true') );
  }

  close(){
    this.router.navigate(['raza',this.nombreRaza,this.idRaza])
  }

}
