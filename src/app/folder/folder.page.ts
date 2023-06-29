import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from '../usuario/autenticacao.service';
import { InfiniteScrollCustomEvent, LoadingController, ToastController } from '@ionic/angular';
import axios from 'axios';
import { PersonagensService } from '../servico/personagens.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor(public auth:AutenticacaoService,
    public toastController:ToastController,
    public router:Router,
    public personagenService:PersonagensService,
    private loadinCtrl: LoadingController

    ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this. carregarPag();
  }

  public lista_personagens = new Array<any>();
  public pagina:number = 1;
  
  ionViewDidEnter(){
    this.carregarPag();
    this.efeitoLoading();
  }

  carregarPag() {
    if (this.pagina == 1) {
      this.lista_personagens = new Array<any>();
    }
    this.personagenService.getPersonagens(this.pagina)
      .then((response) => {
        this.lista_personagens = this.lista_personagens.concat(response);
        console.log(this.lista_personagens);
      })
      .catch((error) => {
        console.log("Falha na Requisição:", error);
      });
    this.pagina++;
  }
  

  


  sair () {
    this.efeitoLoading();
    this.router.navigate(['/login']);
  }


  async efeitoLoading(){
    const loading = await this.loadinCtrl.create({
      message: 'Carregando ...', 
      duration: 1000,
      spinner:'lines-sharp'
    });
    
    loading.present();
  }

  efeitoRefresh(event:any){
    this.pagina = 1;
	setTimeout(() => {
      this.carregarPag();
      event.target.complete();
    }, 1000);
  }

  efeitoScrollInfinito(ev:any){
    this.pagina++;
    setTimeout(() => {

    (ev as InfiniteScrollCustomEvent).target.complete();
    this.carregarPag();

    }, 2500);
   
  } 

}

