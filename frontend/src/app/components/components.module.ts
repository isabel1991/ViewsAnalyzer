import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSimulatorComponent } from './view-simulator/view-simulator.component';
import { DataTableComponent } from './data-table/data-table.component';


@NgModule({
  declarations: [
    ViewSimulatorComponent,
    DataTableComponent
  ],
  exports: [
    ViewSimulatorComponent,
    DataTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
