import { ApiService } from '../services/api-service';
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { Events } from 'services/events';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(ApiService, Router, EventAggregator)
export class Ticket {
    public numbers: ITicketPostModel[] = [];
    public checking;
    constructor(private service: ApiService, private route: Router, private event: EventAggregator) {}

    public attached() {
      this.getInputs();
      this.event.publish(Events.ReloadTicketList);
    }

    public getInputs() {
      this.numbers = [];
      for (let index = 0; index < 7; index++) {
        this.numbers.push( { combination:''} )
      }
    }

    public async onCreateTicket() {
        let postStringCombination = { combination: this.numbers.map(n => `${n.combination}`).join(';') };
        await this.service.createTicket(postStringCombination);
        this.event.publish(Events.ReloadTicketList);
        this.getInputs();
      }

    public async onClick() {
      this.checking = await this.service.checkIfAdmin();
      this.service.isAdmin = true;
      this.route.navigateToRoute('admin');
    }
}
