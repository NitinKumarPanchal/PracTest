import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGrid } from './components/car-model/car-model.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public baseUrl: string = 'http://localhost:5177/api/Car/';

  constructor(private http: HttpClient) {}

  public getCars(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetCars');
  }

  public addCars(obj: IGrid): Observable<any> {
    return this.http.post(this.baseUrl + 'AddCar', obj);
  }
}
