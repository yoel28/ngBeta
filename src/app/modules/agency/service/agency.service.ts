import {Injectable} from '@angular/core';
import {IData} from '../utils/type';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TOKEN_LOCAL_STORAGE} from '../utils/constant';
import {EP_AGENCY} from '../utils/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  public isReady = false;

  constructor(private http: HttpClient) {
    this.init();
  }

  public getData(): IData [] {
    return JSON.parse(localStorage.getItem(TOKEN_LOCAL_STORAGE)) || [];
  }

  public getDataDetail(index: number): IData {
    return this.getData()[index];
  }

  public save(body: IData) {
    const data = this.getData();
    data[body.index] = body;
    this.setLocalStorage(data);
  }

  public updateStar(index: number, value: boolean) {
    const data = this.getData();
    const field = data[index];
    field.star = value;
    data[index] = field;
    this.setLocalStorage(data);
  }

  private init(): void {
    this.isReady = !!this.getData().length;
    if (typeof(Storage) === 'undefined') {
      throw new Error('No tiene soporte de local storage');
    }
    if (!this.getData().length) {
      this.getServer()
        .pipe(
          map((data) => data.map((x, y) => {
              x.index = y;
              x.star = false;
              return x;
            })
          )
        )
        .subscribe(data => {
          this.setLocalStorage(data);
          this.isReady = true;
        });
    }

  }
  private getServer(): Observable<IData[]> {
    return this.http.get<IData[]>(EP_AGENCY);
  }
  private setLocalStorage(data: IData[]): void {
    localStorage.setItem(TOKEN_LOCAL_STORAGE, JSON.stringify(data));
  }
}
