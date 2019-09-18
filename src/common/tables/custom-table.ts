import { observable, bindable } from 'aurelia-framework';

export class CustomTable  {
    @bindable public items: any[] = [];
    @bindable public columns: ICustomColumn[] = [];
    @bindable public entity: string = '';
    @observable public selectedItemsPerPage:string = "5";

    public paginationItems: any[] = [];
    public paginationNumbers: number[] = [];
    public currentPage: number = 1;
    public paginationNumbersLength: number;
    public numberOfProductsPerPage: string[] = ["5", "10", "15", "100"];

    public begin: number;
    public end: number;
    private isLoad: boolean = false;

    constructor() {}

    public async attached () {
        this.isLoad = true;
    }

    public  itemsChanged(newValue: any[], oldValue: any[]) {
        this.setPages();
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
        if(this.end > this.items.length) {
            this.end = this.items.length
        }
        this.paginationItems = this.items.slice(this.begin, this.end);
    }

    private calculatePageNumbers() {
        this.paginationNumbers = [];

        let lengthNumbers = Math.ceil(this.items.length / (+this.selectedItemsPerPage));
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