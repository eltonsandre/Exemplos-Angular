import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Estado {
  id: number;
  sigla: string;
  nome: string;
}

export class Cidade {
  id: number;
  nome: string;
  UF: Estado;
} 

@Component({
  selector: 'app-estado-cidade',
  templateUrl: './estado-cidade.component.html',
  styles: []
})
export class EstadoCidadeComponent implements OnInit {

  apiURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';


  estados: Array<Estado>;
  estado: Estado;

  cidades: Array<Cidade>;
  cidade: Cidade;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.carregarEstados();
  }

  carregarEstados() {
    this.http.get<Array<Estado>>(this.apiURL)
      .pipe().subscribe(
        data => this.estados = data,
        error => console.error(error)
      );
  }

  carregarCidades(estado: Estado) {
    console.error(estado);
    this.http.get<Array<Cidade>>(`${this.apiURL}/${estado.id}/municipios`)
      .pipe()
      .subscribe(
        data => this.cidades = data,
        error => console.error(error)
      );
  }

}
