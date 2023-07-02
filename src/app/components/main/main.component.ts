import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { EditComponent } from '../edit/edit.component';
import { CarService } from 'src/app/services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cars = this.localStorageService.getCarsLocalStorage();
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Company', 'Model', 'VIN', 'Color', 'Year', 'Price', 'Availability', 'Action'];
  subscription!: Subscription
  constructor(
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private carService: CarService,
    private cd:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscription = this.carService._cars.subscribe((cars) => {
      this.dataSource.data = cars;
      this.cars = cars;
      this.cd.detectChanges()
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  edite(id: number, enterAnimationDuration?: string, exitAnimationDuration?: string): void {
    this.localStorageService.idToLocalStorage(id);
    this.dialog.open(EditComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  delete(id: number, enterAnimationDuration?: string, exitAnimationDuration?: string): void {
    this.localStorageService.idToLocalStorage(id);
    this.dialog.open(DeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


