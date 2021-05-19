import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { Router } from '@angular/router';
import { ToastyService } from '../../services/toasty/toasty.service';
import { DogService } from 'src/app/services/dog/dog.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  nombre = '';
  id = '';
  raza = '';
  perro = {};
  fecha = '';

  constructor(
    private activatedRoute : ActivatedRoute,
    public alertController : AlertController,
    private db : DbService,
    private dogService: DogService,
    private router : Router,
    private toasty : ToastyService) { }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('Id');
    })

    this.perro = await this.db.getPerro(this.id);
    this.fecha = await this.db.getFecha(this.id);
    this.raza = (await this.dogService.getRaceIdByDogId(this.id)).toString()
  }

  async borrar() {
    const confirmacion = await this.confirmar();
    if (!confirmacion) return;

    this.dogService.delete(this.id);
    this.toasty.msg(3,"Acabas de borrar a "+this.nombre);
    this.router.navigate(['/raza', this.raza]);
  }

  async confirmar() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: '¿Seguro que quieres eliminar este perrito?',
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
    this.dogService.adopt(this.id);
    this.ngOnInit();
  }

  async mensaje() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Gracias por adoptar este perrito.',
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

}
