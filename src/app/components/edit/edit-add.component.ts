import {  ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/interfaces/car';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-add.component.html',
  styleUrls: ['./edit-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAddComponent implements OnInit{
  car!: Car;

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit(): void {
    this.car = this.localStorageService.getOneCar(this.data.id)
  }

}
