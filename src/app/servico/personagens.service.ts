import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class PersonagensService {
  characters: any[] = [];
  path: string = 'https://rickandmortyapi.com/api/character/?page=';

  getPersonagens(pagina: number) {
    let apiUrl = this.path + pagina;
    return axios.get(apiUrl)
      .then((response) => {
        this.characters = response.data.results;
        return this.characters; // Retorna os personagens
      })
      .catch((error) => {
        console.log('Erro ao obter personagens:', error);
        throw error; // Lança o erro para ser tratado externamente
      });
  }
}
