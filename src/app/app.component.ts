import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './components/add/add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'table-app';

  constructor( public dialog: MatDialog ) { }
  addCar(enterAnimationDuration?: string, exitAnimationDuration?: string): void {
    this.dialog.open(AddComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
