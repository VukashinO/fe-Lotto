import { inject, observable } from 'aurelia-framework';
import { ApiService } from 'services/api-service';
import { Router } from 'aurelia-router';

@inject(ApiService, Router)
export class Admin {

  @observable public selectedItemsPerPage:string = "5";
  public roundResults: IRoundVIewModel[] = [];
  public paginationTickets: IRoundVIewModel[] = [];
  public paginationNumbers: number[] = [];
  public currentPage: number = 1;
  public paginationNumbersLength: number;
  public numberOfProductsPerPage: string[] = ["5", "10", "15", "100"];
  public begin: number;
  public end: number;
  private isLoad: boolean = false;

  constructor(private service: ApiService, private route: Router) {}

  public async attached () {
    await this.getRoundResults();
    this.setPages();
    this.isLoad = true;
  }

  public async createRound() {
    await this.service.generateRound();
  }

  private async getRoundResults() {
    this.roundResults = await this.service.getResultsByRound();
  }

  public async getTicketsByRoundId(round: number) {
    this.route.navigateToRoute('ticketsByRound', { roundId:round });
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
    if(this.end > this.roundResults.length) {
        this.end = this.roundResults.length
    }
    this.paginationTickets = this.roundResults.slice(this.begin, this.end);
}

private calculatePageNumbers() {
    this.paginationNumbers = [];

    let lengthNumbers = Math.ceil(this.roundResults.length / (+this.selectedItemsPerPage));
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


export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}




