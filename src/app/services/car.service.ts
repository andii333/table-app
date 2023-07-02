import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../interfaces/car';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  _cars = new BehaviorSubject<Car[]>([])

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
  ) { this.setCars() }

  setCars() {
    if (this.localStorageService.getCarsLocalStorage()?.length) {
      this._cars.next(this.localStorageService.getCarsLocalStorage())
    } else {
      this.apiService.getCars().subscribe((cars) => this._cars.next(cars))
    }
  }

  updateCarsList(cars: Car[]): void {
    this._cars.next(cars)
  }
}
