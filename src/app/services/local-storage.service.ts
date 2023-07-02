import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setCarsLocalStorage(info: Car[]): void {
    localStorage.setItem('cars', JSON.stringify(info))
  }

  addCarsLocalStorage(car: Car): void {
    const cars = this.getCarsLocalStorage();
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars))
  }

  getCarsLocalStorage(): Car[] {
    if (localStorage.getItem('cars') != null && localStorage.getItem('cars')?.length) {
      return JSON.parse(localStorage.getItem('cars') as string)
    }
    else return []
  }

  getOneCar(id: number): Car {
    const cars = this.getCarsLocalStorage();
    const index = cars.findIndex((car) => car.id === id)
    return cars[index]
  }

  idToLocalStorage(id: number) {
    localStorage.setItem('id', JSON.stringify(id))
  }

  getIdLocalStorage(): number {
    if (localStorage.getItem('id') != null) {
      return JSON.parse(localStorage.getItem('id') as string)
    }
    else return NaN
  }
  deleteIdLocalStorage(): void {
    localStorage.removeItem('id')
  }
}
