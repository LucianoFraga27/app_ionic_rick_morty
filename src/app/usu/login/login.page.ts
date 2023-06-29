import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AutenticacaoService } from '../../usuario/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";
  public nome: string = "";

  constructor( 
    public autenticacaoService:AutenticacaoService,
    public router:Router,
    public toastController:ToastController
    ) {}

    loginUsuario(){
      this.autenticacaoService.loginNoFirebase(this.email, this.senha)
      .then((res) => {
        this.nome = this.extrairNomeDoEmail(this.email);
        this.router.navigate(['folder/api']);
        this.mensagem ='Login Realizado!';
          this.exibeMensagem();
      }).catch((error) => {
        this.mensagem = "E-mail e/ou Senha Incorreto(s)";
        this.exibeMensagem();
      })
    }
  
    async exibeMensagem() {
      const toast = await this.toastController.create({
        message: this.mensagem,
        duration: 2000
      });
      toast.present();
    }
    limparLocalStorage() {
      localStorage.clear();
    }
  ngOnInit() {
  }

  extrairNomeDoEmail(email: string): string {
    const indiceArroba = email.indexOf('@');
    
    if (indiceArroba !== -1) {
      return email.substring(0, indiceArroba);
    } else {
      return '';
    }
  }

  }

