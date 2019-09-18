import { ApiService } from 'services/api-service';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthToken } from 'userAuthorization/auth-token';

@inject(ApiService, Router)
export class Register {
  public register: IRegisterViewModel;
  public authorize: IAuthorizeModel;
  constructor(private service: ApiService, private route: Router) {}
  

  public async onRegister() {
    this.authorize = await this.service.register(this.register);
    localStorage.setItem(AuthToken.token, this.authorize.token);
    this.service.isAuth = true;
    this.register = null;
    this.route.navigateToRoute('ticket');
  }

  public onAlreadyMember() {
    this.route.navigateToRoute('logIn');
    return false;
  }
}
