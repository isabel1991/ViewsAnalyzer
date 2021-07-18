import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Output() outputListener:EventEmitter<any> = new EventEmitter();
  @Input() list:any[];

  ngOnInit(): void {
    
  }

}
