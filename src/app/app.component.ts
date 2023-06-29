import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public appPages = [
    { title: 'api', url: '/folder/inbox', icon: 'mail' },
    { title: 'sobre-mim', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'sair', url: '/folder/outbox', icon: 'aperture-outline' },
  
  ];

  constructor(private router:Router,
    private platform: Platform ) {
      this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.router.navigateByUrl('splash');
    });
  }

}
