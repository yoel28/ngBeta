import {Injectable} from '@angular/core';
import {IData, IDataDetail} from '../type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  public isReady = false;

  constructor(private http: HttpClient) {
    this.init();
  }



  public getData(): IData [] {

    return this.loadData().map((x, i) => (
      {
        agencia: x.agencia,
        provincia: x.provincia,
        direccion: x.direccion,
        index: x.index,
        star: x.star,
        lat: x.lat,
        lon: x.lon
      }
    ));
  }

  public getDataDetail(index: number): IDataDetail {
    return this.loadData()[index];
  }

  public save(body: IDataDetail) {
    const data = this.loadData();
    data[body.index] = body;
    localStorage.setItem('data', JSON.stringify(data));
  }

  public updateStar(index: number, value: boolean) {
    const data = this.loadData();
    const field = data[index];
    field.star = value;
    data[index] = field;
    localStorage.setItem('data', JSON.stringify(data));
  }

  private loadData(): IDataDetail [] {
    return JSON.parse(localStorage.getItem('data')) || [];
  }
  private init(): void {
    this.isReady = !!this.loadData().length;
    if (typeof(Storage) === 'undefined') {
      throw new Error('No tiene soporte de local storage');
    }
    if (!this.loadData().length) {
      this.getServer()
        .pipe(
          map((data) => data.map((x, y) => {
              x.index = y;
              x.star = false;
              return x;
            })
          )
        )
        .subscribe(x => {
          localStorage.setItem('data', JSON.stringify(x) );
          this.isReady = true;
        });
    }

  }
  private getServer(): Observable<IDataDetail[]> {
    return this.http.get<IDataDetail[]>('api/agency');
  }
}
