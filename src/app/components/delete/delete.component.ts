import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private localStorageService: LocalStorageService,
    private carService: CarService
  ) { }

  delete() {
    const id = this.localStorageService.getIdLocalStorage();
    const cars = this.localStorageService.getCarsLocalStorage();
    const index = cars.findIndex((car) => car.id === id);
    if (index >= 0) {
      const newCars = [...cars.slice(0, index), ...cars.slice(index + 1)];
      this.localStorageService.setCarsLocalStorage(newCars);
      this.carService.updateCarsList(newCars)
    }
    this.localStorageService.deleteIdLocalStorage();
  }
}
