import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Stream } from 'src/app/model/utils/Stream';
@Component({
  selector: 'view-simulator',
  templateUrl: './view-simulator.component.html',
  styleUrls: ['./view-simulator.component.scss']
})
export class ViewSimulatorComponent implements OnInit {

  @Input() stream: Stream;

  ngOnInit(): void {
    this.stream.openImports().subscribe(
      data => {
        
      }
    )
  }

}
