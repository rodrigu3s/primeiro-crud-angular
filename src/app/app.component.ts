import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from './filmes.service';
import { Filme } from './shared/models/filme.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allFilmes: Filme[] = [];
  form: FormGroup;
  filme: Filme = {};

  constructor(private filmesService: FilmesService, private formBuilder: FormBuilder){
    this.listarAllFilmes()
    this.form = this.formBuilder.group({
      id: [null],
      filme: [null],
      genero: [null],
      classificacao: [null],
      valor: [null],
      disponivel:[null]
    })
  }

  listarAllFilmes(){
    this.filmesService.getAllFilmes().subscribe(data=>{
      this.allFilmes = data;
    })
  }

  submit(){
    if(this.form.value.id){
      this.filmesService.putFilme(this.form.value.id, this.form.value).subscribe(()=>{
        this.listarAllFilmes();
        this.form.reset();
      })
    }
    else{
      this.filmesService.postFilme(this.form.value).subscribe(()=>{
        this.listarAllFilmes();
        this.form.reset();
      })
    }
  }

  deleteFilme(id: number | undefined){
    if(id){
      this.filmesService.delFilme(id).subscribe(()=>{
        this.listarAllFilmes();
      })
    }
  }

  getByFilme(id: number | undefined , isConsult = false){
    if(id){
      this.filmesService.getByIdFilme(id).subscribe((filme )=>{
        if(isConsult){
          this.filme = filme;
        }else{
          this.form.patchValue({
            ...filme
          })
        }
      })
    }

  }

  // consultaFilme(id: any){
  //   this.filmesService.getByIdFilme(id).subscribe((data: any )=>{
  //     this.getFilmeById = data;
  //   })
  // }

}
