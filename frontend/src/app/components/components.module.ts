import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { SelectComponent } from './select/select.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RangeInputComponent } from './range-input/range-input.component';



@NgModule({
  declarations: [
    ChatComponent,
    SelectComponent,
    ProgressBarComponent,
    RangeInputComponent
  ],
  exports: [
    ChatComponent,
    SelectComponent,
    ProgressBarComponent,
    RangeInputComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
