import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDogApiService {

  public razas = [];

  constructor(public httpClient: HttpClient) { }

  getRazas() {
    this.httpClient.get("https://dog.ceo/api/breeds/list/all").subscribe(datos => {
      const entries = Object.entries(datos["message"]);
      entries.forEach(async (entry) => {
        const aux = entry[1] as string[];
        if (entry[1][0]) {
          aux.forEach(async element => {
            this.razas.push({
              raza: `${element} ${entry[0]}`,
              imagen: await this.getImageSubraza(entry[0], element)
            });
          });
        } else {
          this.razas.push({
            raza: entry[0],
            imagen: await this.getImageRaza(entry[0])
          });
        }
      });
    })
    return this.razas;
  }
  getImageRaza(raza): Promise<string> {
    return new Promise((resolve) => {
      this.httpClient.get(`https://dog.ceo/api/breed/${raza}/images/random`).subscribe(datos => {
        resolve(datos["message"]);
      })
    })
  }
  getImageSubraza(raza, subraza): Promise<string> {
    return new Promise((resolve) => {
      this.httpClient.get(`https://dog.ceo/api/breed/${raza}/${subraza}/images/random`).subscribe(datos => {
        resolve(datos["message"]);
      })
    })
  }

}
