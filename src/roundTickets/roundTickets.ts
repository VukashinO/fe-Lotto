import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, observable } from 'aurelia-framework';
import { ApiService } from 'services/api-service';

@inject(EventAggregator, ApiService)
export class RoundTickets {

 @observable public selectedItemsPerPage:string = "5";
 public roundId: number;
 public ticketsByroundId: IResponceTicketViewModel[] = [];
 public paginationTickets: IResponceTicketViewModel[] = [];
 public paginationNumbers: number[] = [];
 public currentPage: number = 1;
 public paginationNumbersLength: number;
 public numberOfProductsPerPage: string[] = ["5", "10", "15", "100"];
 public begin: number;
 public end: number;
 private isLoad: boolean = false;
 public winningCombination: IWinningCombination;

 constructor(private event: EventAggregator, private service: ApiService) {}

    public async attached() {
        await this.getTickets(this.roundId);
        await this.getWinningCombinationByRoundId(this.roundId);
        this.setPages();
        this.isLoad = true;
    }

    activate(params) {
        this.roundId = +params.roundId;
    }

    private async getTickets(round: number) {
        this.ticketsByroundId =  await this.service.getTicketsByRoundId(round);
    }

    private async getWinningCombinationByRoundId(round: number) {
      this.winningCombination = await this.service.getWinningCombinationByRoundId(round);
    }
    public selectedItemsPerPageChanged(newValue:string, oldValue:string) {
        if (newValue !== oldValue && this.isLoad) {
            this.currentPage = 1;
            this.setPages();
        }  
      }
    
      private setPages() {
        this.loadPaginationTickets();
        this.calculatePageNumbers();
      }
    
      private loadPaginationTickets() {
        this.begin = ((this.currentPage - 1) * (+this.selectedItemsPerPage));
        this.end = this.begin + (+this.selectedItemsPerPage);
        if(this.end > this.ticketsByroundId.length) {
            this.end = this.ticketsByroundId.length
        }
        this.paginationTickets = this.ticketsByroundId.slice(this.begin, this.end);
    }
    
    private calculatePageNumbers() {
        this.paginationNumbers = [];
    
        let lengthNumbers = Math.ceil(this.ticketsByroundId.length / (+this.selectedItemsPerPage));
        for(let i = 1; i <= lengthNumbers; i++) {
            this.paginationNumbers.push(i);
        }
        this.paginationNumbersLength = lengthNumbers;
    }
    
    public onPaginationNumberClicked(paginationInput:string) {
        this.currentPage = +paginationInput;
        this.loadPaginationTickets();
    }
    
    public onPreviousPage() {
        this.currentPage -= 1;
        if(this.currentPage < 1) {
            return;
        }
        this.loadPaginationTickets();
    }
    
    public onNextPage() {
        this.currentPage += 1;
        if(this.currentPage > this.paginationNumbers.length) {
            return;
        }
        this.loadPaginationTickets();
    }
}
