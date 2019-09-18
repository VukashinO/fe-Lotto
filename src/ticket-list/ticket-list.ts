import { ApiService } from '../services/api-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import { inject, observable } from 'aurelia-framework';
import { Events } from '../services/events';

@inject( ApiService, EventAggregator )
export class TicketList  {
    
     public tickets : IResponceTicketViewModel[] = [];
     public ticketsColumns: ICustomColumn[] = [];
     private isLoad: boolean = false;

    constructor( private service : ApiService, private eventAggregator : EventAggregator ) {}

    public async attached () {
        this.eventAggregator.subscribe(Events.ReloadTicketList, () => {
          this.getTickets();
        });

        await this.getTickets();
        this.isLoad = true;
    }

    private async getTickets() {
        this.getTableColumns();
        this.tickets = await this.service.getTicketsByUserId();
    }

    private getTableColumns() {
        this.ticketsColumns = [
            {
                propertyName: 'round',
                propertyTitle: 'Round'
            }, {
                propertyName: 'combination',
                propertyTitle: 'Combinaton'
            }, {
                propertyName: 'roundCombination',
                propertyTitle: 'Round Combination'
            }, {
                propertyName: 'prize',
                propertyTitle: 'Prize'
            }, {
                propertyName: 'dateCreated',
                propertyTitle: 'Date Created'
            }
        ];
    }
}



