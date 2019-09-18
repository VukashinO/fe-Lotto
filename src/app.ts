import {RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from "aurelia-framework";
import { AuthorizeStep } from './pipeline-steps/authorizeStep'; 

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Aurelia';
    config.addAuthorizeStep(AuthorizeStep)
    config.map([

    {
      route: ['','logIn'],
      name: 'logIn',
      nav:false,     
      title:'logIn',                  
      moduleId: PLATFORM.moduleName('logIn/logIn') 
    },
    { 
      route: 'register',                       
      name: 'register', 
      nav:false,  
      title:'register',             
      moduleId: PLATFORM.moduleName('register/register') 
    },
    { 
      route: 'ticket',                         
      name: 'ticket',   
      nav: true, 
      title:'ticket',      
      moduleId: PLATFORM.moduleName('ticket/ticket'),  
      settings:{ isAuth : true } 
    },
    { 
      route: 'admin',                          
      name: 'admin',                    
      moduleId: PLATFORM.moduleName('admin/admin'),    
      settings:{ isAdmin : true } 
    },
    { 
      route: 'admin/ticketsByRound/:roundId',  
      name: 'ticketsByRound',          
      moduleId: PLATFORM.moduleName('roundTickets/roundTickets'), 
      settings:{ isAdmin : true } 
    }
    ]);
  }
}




  







