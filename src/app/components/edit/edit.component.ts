import {  ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Car } from 'src/app/interfaces/car';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit{
  car!: Car;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    const id = this.localStorageService.getIdLocalStorage();
    this.car = this.localStorageService.getOneCar(id)
  }

}
