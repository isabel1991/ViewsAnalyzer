import { Component, OnInit } from '@angular/core';
import { View } from 'src/app/model/View';

@Component({
  selector: 'app-view-management',
  templateUrl: './view-management.component.html',
  styleUrls: ['./view-management.component.scss']
})
export class ViewManagementComponent implements OnInit {

  public viewList:View[];

  constructor() { }

  ngOnInit(): void {
  }

}
