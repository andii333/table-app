import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/interfaces/car';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormComponent implements OnInit{
  @Input() car!: Car;
  form = this.fb.group({
    'car': ['', [Validators.maxLength(25), Validators.required]],
    'car_model': ['', [Validators.maxLength(25), Validators.required]],
    'car_vin': ['', [Validators.minLength(4), Validators.maxLength(20), Validators.required]],
    'car_model_year': [NaN, [Validators.pattern('^[0-9]{4}$'), Validators.required]],
    'car_color': ['', Validators.required],
    'price': ['', Validators.required],
    'availability': false,
    'id': NaN
  });
  cars = this.localStorageService.getCarsLocalStorage();

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    if (this.car) {
      this.form = this.fb.group({
        'car': [this.car.car, [Validators.maxLength(25), Validators.required]],
        'car_model': [this.car.car_model, [Validators.maxLength(25), Validators.required]],
        'car_vin': [this.car.car_vin, [Validators.minLength(4), Validators.maxLength(20), Validators.required]],
        'car_model_year': [this.car.car_model_year, [Validators.pattern('^[0-9]{4}$'), Validators.required]],
        'car_color': [this.car.car_color, Validators.required],
        'price': [this.car.price, Validators.required],
        'availability': [this.car.availability],
        'id': [this.car.id]
      })
    }
  }

  generationId(): number {
    if (this.cars.length) {
      const idArray: number[] = [];
      this.cars.forEach(car => idArray.push(car.id));
      const id = Math.max(...idArray) + 1;
      return id
    } else {
      return 1
    }
  }

  submit() {
    if (this.car) {
      const index = this.cars.findIndex(car => car.id === this.car.id);
      this.cars[index] = this.form.getRawValue() as unknown as Car;
      this.localStorageService.setCarsLocalStorage(this.cars);
      this.dialog.closeAll();
    } else {
      this.form.controls.id.setValue(this.generationId());
      this.localStorageService.addCarsLocalStorage(this.form.getRawValue() as unknown as Car);
      this.form.reset({ availability: false });
    }
    this.localStorageService.deleteIdLocalStorage();
    this.carService.updateCarsList(this.localStorageService.getCarsLocalStorage());
  }
}
