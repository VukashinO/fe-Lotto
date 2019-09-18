import { ApiService } from '../services/api-service';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AuthToken } from 'userAuthorization/auth-token';

@inject(ApiService, Router)
export class LogIn {
    public authorize: IAuthorizeModel;
    public logIn: ILogInViewModel;
    public error: string;
    constructor(private service: ApiService, private route: Router) {}
 
    public attached() {
       if(this.route.isNavigatingBack) {
        localStorage.removeItem(AuthToken.token);
        this.service.isAuth = false;
       }
    }
        
    public async onLogIn() {
    this.authorize =  await this.service.logIn(this.logIn);
    localStorage.setItem(AuthToken.token, this.authorize.token);
    localStorage.setItem(AuthToken.user, this.authorize.userName);
    if(this.authorize.isAdmin)
    {
        this.service.isAdmin = true;
        localStorage.setItem(AuthToken.admin, 'yes you are admin!');
    }
    this.service.isAuth = true;
    this.route.navigateToRoute('ticket');
    }

    public onDontHaveAccount() {
        this.route.navigateToRoute('register');
        return false;
    }
}
