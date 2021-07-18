import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { View } from 'src/app/model/View';
import { ViewServiceProvider } from 'src/app/providers/view.provider';
declare function _init();
declare function showContainer(container: string, animation?: boolean);
declare function hideContainer(container: string, animation?: boolean);

@Component({
  selector: 'app-view-management',
  templateUrl: './view-management.component.html',
  styleUrls: ['./view-management.component.scss']
})
export class ViewManagementComponent implements OnInit {

  @Input() outputListener: EventEmitter<any>;
  @Output() viewList:View[] = [];

  public loading: boolean = true;
  public thereAreViews: boolean = false;

  public newView: View = new View();


  constructor(private viewProvider: ViewServiceProvider) { }

  ngOnInit(): void {
    _init();
    this.getViewList();
  }

  private getViewList(): void {
    const _ = this;
    const currentTime = Date.now();
    this.loading = true;
    
    this.viewProvider.getAllViews().subscribe(
      views => {
        this.thereAreViews = true;
        
        this.viewList = [];

        for(let viewObj of views) {
          let view = View.parse(viewObj);
        }

        
        
        setTimeout(function () {
          _.loading = false;
        }, (currentTime - Date.now()) < 1000 ? 1000 : 0);
        
      },
      err => {
        console.log("errors", err);
        this.loading = false;
        this.thereAreViews = false;
        console.log("thereAreViews", this.thereAreViews);

      }
    )
  }

  public openContainer(componentSelector: string, inverseViewComponentSelector?: string): void {

    setTimeout(function () {
      showContainer(componentSelector);
    }, 100);
    if (inverseViewComponentSelector) {
      hideContainer(inverseViewComponentSelector, false);
    }
  }

  public closeContainer(componentSelector: string, inverseViewComponentSelector?: string): void {

    switch (componentSelector) {
      case ".creation-view-container":
        this.cleanNewViewForm();
        break;
      default:
        break;
    }
    setTimeout(function () {
      hideContainer(componentSelector);

      setTimeout(function () {
        if (inverseViewComponentSelector) {
          showContainer(inverseViewComponentSelector, false);
        }
      }, 700);
    }, 500);
  }

  public cleanNewViewForm() {
    this.newView.name.value = "";
    this.newView.description.value = "";
    this.newView.usingFiltroMayores.value = false;
  }

  public createNewView() {
    const _ = this;
    const currentTime = Date.now();

    if (this.newView.name.value.trim() && this.newView.description.value.trim()) {
      this.viewProvider.createView(this.newView).subscribe(
        data => {
          setTimeout(function () {
            console.log("ventana creada con éxito");
            _.closeContainer('.creation-view-container', '.view-options>button#newViewButton');
            _.getViewList();
          }, (currentTime - Date.now()) < 1000 ? 1000 : 0);
        },
        err => {

        }
      )
    }
    else {
      alert("Los campos de la ventana son obligatorios");
    }

  }
}
