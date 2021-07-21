import { Component, Input, OnInit } from '@angular/core';
import { Tablelable } from 'src/app/model/Tablelable.interface';
import * as $ from 'jquery';
import { Stream } from 'src/app/model/utils/Stream';
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() stream: Stream;
  public list: Tablelable[];
  public columns: string[] = [];

  ngOnInit(): void {
    console.log("llega al ngOnInit DataTable");

    this.stream.openImports().subscribe(
      data => {
        this.list = data;

        if (data && (data.length > 0))
          this.columns = data[0].getColumns();
      }
    );

  }

  selectRow(index: number) {
    let items = $(".row");
    
    if (typeof $(items.get(index)).attr("selected") !== "string") {
      items.removeAttr("selected");
      $(items.get(index)).attr("selected", "");
      
      this.stream.exports(this.list[index]);
    }
    else {
      items.removeAttr("selected");      
      this.stream.exports(null);
    }

  }
}
