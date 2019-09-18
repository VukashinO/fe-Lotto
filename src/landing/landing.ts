import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';


@inject(Router)
export class Landing {

constructor(private router : Router) {}


public onLogIn()  {
   this.router.navigateToRoute('logIn')
  }

}
