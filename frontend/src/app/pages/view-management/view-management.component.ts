import { Component, EventEmitter, OnInit } from '@angular/core';
import { View } from 'src/app/model/View';
import { ViewServiceProvider } from 'src/app/providers/view.provider';

@Component({
  selector: 'app-view-management',
  templateUrl: './view-management.component.html',
  styleUrls: ['./view-management.component.scss']
})
export class ViewManagementComponent implements OnInit {

  public viewOutputListener: EventEmitter<View[]> = new EventEmitter<View[]>();
  public viewInputListener: EventEmitter<View> = new EventEmitter<View>();
  public loading: boolean = true;
  public thereAreViews: boolean = false;

  constructor(private viewProvider: ViewServiceProvider) { }

  ngOnInit(): void {
    this.getViewList();
  }



  private getViewList(): void {
    this.viewProvider.getAllViews().subscribe(
      views => {
        console.log("views", views);
        this.loading = false;

        if (views) {
          this.thereAreViews = views.length > 0 ? true : false;
          this.viewOutputListener.emit(views);
        }
        else {
          this.viewOutputListener.emit([]);
        }

      },
      err => {
        console.log("errors", err);
        this.loading = false;

      }
    )
  }
}
