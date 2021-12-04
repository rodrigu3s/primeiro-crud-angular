import { Filme } from './shared/models/filme.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";

const URL = "http://localhost:3000"

@Injectable({ // essa class é é injetavel.
  providedIn: "root",  //root deixa o serviço disponivel para todo o projeto
})

export class FilmesService{

  constructor(private http: HttpClient){  //injeção dependencia, accessando http vou ter acesso a HttpClient

  }

  getAllFilmes(): Observable<Filme[]>{
    return this.http.get<Filme[]>(URL+'/filmes')
  }

  postFilme(filme: Filme): Observable<Filme>{
    return this.http.post<Filme>(URL+'/filmes', filme ) // filmes é enviado como corpo que é payload
  }

  delFilme(id: number): Observable<any>{
    return this.http.delete(URL+'/filmes/'+ id )
  }

  getByIdFilme(id: number): Observable<Filme>{
    return this.http.get<Filme>(URL+'/filmes/'+id)
  }

  putFilme(id: number, filme: Filme): Observable<Filme>{
    return this.http.put<Filme>(URL+'/filmes/'+id, filme)
  }

}
