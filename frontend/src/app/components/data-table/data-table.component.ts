import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() listener:EventEmitter<Array<any>>;
  public list:Array<any>;

  ngOnInit(): void {
    this.listener.subscribe(
      list => {
        console.log("list",this.list);
      }
    )
  }

}
