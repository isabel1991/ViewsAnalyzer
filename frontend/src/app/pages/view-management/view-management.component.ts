import { Component, OnInit, Output } from '@angular/core';
import { Stream } from 'src/app/model/utils/Stream';
import { View } from 'src/app/model/View';
import { UserServiceProvider } from 'src/app/providers/user.provider';
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

  @Output() stream: Stream = new Stream();
  @Output() streamTreeView: Stream = new Stream();
  @Output() streamSimulator: Stream = new Stream();
  public loading: boolean = true;
  public thereAreViews: boolean = false;

  private viewList: View[];
  public newView: View = new View();
  public viewSelected: View;
  constructor(private userProvider: UserServiceProvider, private viewProvider: ViewServiceProvider) { }

  ngOnInit(): void {
    _init();
    this.getViewList();

    this.stream.openExports().subscribe(
      data => {
        this.viewSelected = View.parse(data);
        if (data)
          setTimeout(function() {
            _init();
          },100);
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
      case ".creation-view-container":

        break;
      case ".creation-view-container":

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
      }, 200);
    }, 500);
  }

  public cleanNewViewForm() {
    this.newView.name = "";
    this.newView.description = "";
    this.newView.usingFiltroMayores = false;
  }

  private getViewList(): void {
    const _ = this;
    const currentTime = Date.now();
    this.loading = true;
    this.stream.imports(null, true);
    this.viewProvider.getAllViews().subscribe(
      views => {
        this.thereAreViews = true;

        let viewList = [];

        for (let viewObj of views) {
          const view = View.parse(viewObj);
          view.setCurrentUser(this.userProvider.getUserLogged());
          viewList.push(view);
        }
        this.viewList = viewList;
        setTimeout(function () {
          _.stream.imports(viewList, true);
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

  public createNewView() {
    const _ = this;
    const currentTime = Date.now();

    if (this.newView.name.trim() && this.newView.description.trim()) {
      this.viewProvider.createView(this.newView).subscribe(
        () => {
          setTimeout(function () {
            _.closeContainer('.creation-view-container', '.view-options>button#newViewButton');
            _.getViewList();
          }, (currentTime - Date.now()) < 1000 ? 1000 : 0);
        },
        err => {
          alert(err);

        }
      )
    }
    else {
      alert("Los campos de la ventana son obligatorios");
    }

  }

  public removeViewSelected() {
    let resp = confirm("estás seguro de querer eliminar la ventana");

    if (resp) {
      this.viewProvider.removeView(this.viewSelected).subscribe(
        data => {
          this.viewList = this.viewList.filter(e => e.id != this.viewSelected.id);
          this.stream.imports(this.viewList, true);
        },
        err => {
          console.log("error al eliminar");
        }
      );
    }

  }
}
