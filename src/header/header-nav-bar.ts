import { bindable, inject } from "aurelia-framework";
import { ApiService } from '../services/api-service';
import { Router } from 'aurelia-router';
import { AuthToken } from 'userAuthorization/auth-token';

@inject(ApiService, Router)
export class HeaderNavBar {
  @bindable router;
  public show: boolean;
  public renderNav: boolean;
  public user = localStorage.getItem(AuthToken.user);
  public admin = localStorage.getItem(AuthToken.admin);

  constructor(private service: ApiService, private route: Router) {}

  public attached() {
  this.renderNav = localStorage.getItem(AuthToken.token) ? true : false;
  }

  public onClick() {
    this.show = !this.show;
  }

  public signOut() {
    this.clearStorage();
    this.route.navigateToRoute('logIn');
    return false;
  }

  private clearStorage() {
    localStorage.removeItem(AuthToken.token);
    localStorage.removeItem(AuthToken.user);
    localStorage.removeItem(AuthToken.admin);
    this.service.isAuth = false;
  }

  public handleAdminPage() {
    this.route.navigateToRoute('admin');
  }
}
