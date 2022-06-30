import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, IterableDiffers } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private publicApiKey: string = 'oMbV2oMPQe1IrPUVA7ugUl0OEiRdfWsN';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor (private http: HttpClient){
    const historial = localStorage.getItem('historial');
    const resultados = localStorage.getItem('resultados');
    if (historial) {
      this._historial = JSON.parse(historial);
      if(resultados){
        this.resultados = JSON.parse(resultados);
      }
    }
  }

  buscarGifs(query: string) {
    query = query.toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key',this.publicApiKey)
      .set('q', query)
      .set('limit', '10');

    this.http.get(`${this.servicioUrl}/search`, { params })
      .subscribe( (resp: any) =>{
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }
}
