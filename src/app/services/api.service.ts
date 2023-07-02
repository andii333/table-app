import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Car } from '../interfaces/car';
import { ApiData } from '../interfaces/api-data';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getCars(): Observable<Car[]> {
    return this.http.get<ApiData>('https://myfakeapi.com/api/cars/').pipe(
      map((list: ApiData) => {
        this.localStorageService.setCarsLocalStorage(list.cars)
        return list.cars
      })
    )
  }

}
