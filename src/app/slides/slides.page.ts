import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  public exibir: boolean = true;
  public vezes: number = 0;

  constructor(public router: Router) { }

  ngOnInit() {
    const contadorEntradas = localStorage.getItem('contadorEntradas');
    if (contadorEntradas) {
      this.vezes = parseInt(contadorEntradas, 10);
    }
  }

  ionViewWillEnter() {
    const exibirSlides = localStorage.getItem('exibirSlides');

    if (exibirSlides === 'false') {
      return this.router.navigate(['/login']);
    } else if (this.vezes >= 3) {
      localStorage.setItem('exibirSlides', 'false');
      return this.router.navigate(['/login']);
    } else {
      return this.router.navigate(['/slides']);
    }
  }

  naoExibirMais() {
    this.exibir = false;
    localStorage.setItem('exibirSlides', 'false');
    this.router.navigate(['/login']);
  }

  sair() {
    this.vezes += 1;
    localStorage.setItem('contadorEntradas', this.vezes.toString());
    if (this.vezes >= 10) {
      localStorage.setItem('exibirSlides', 'false');
    }
    this.router.navigate(['/login']);
  }
}
