import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transactions } from '../../model/transactions.model';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Config } from '../../config';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogueBoxComponent } from '../../templates/dialogue-box/dialogue-box.component';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatSortModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  faSearch = faSearch;

  search: string = '';

  transactions: Transactions[] = [];
  paginatedTransactions: Transactions[] = [];

  pageEvent?: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(
    private transactionService: TransactionService,
    private matDialog: MatDialog
  ) {
  }



  ngOnInit(): void {
    this.getTransactionList();
  }


  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageEvent = event;
      this.paginateTransactions();
    });
  }


  /**
   * Get the list of transactions from json file
   */
  getTransactionList() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.filteredTransactions = [...this.transactions];
        this.paginateTransactions();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  /**
   * 
   * @param filter the key to filter the transactions
   * @param event  the event object
   * returns the filtered transactions according to the filter passed
   */
  filterTransactions(filter: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.selectedFilter = filter;
    if (filter === 'All') {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter(transaction => transaction.status === filter);
    }
    console.log(this.filteredTransactions);
    this.pageEvent ? this.pageEvent.pageIndex = 0 : 0
    this.paginateTransactions();
  }




  private searchValue: Subject<string> = new Subject<string>();
  /**
   * Search the transactions based on the search value
   */
  searchData() {
    this.searchValue.next(this.search);
    this.searchValue.pipe(debounceTime(400)).subscribe((value) => {
      if (value) {
        this.filteredTransactions = this.filteredTransactions.filter(transaction => transaction.description.toLowerCase().includes(value.toLowerCase()));
        this.paginateTransactions();
      } else {
        this.filterTransactions(this.selectedFilter);
      }
    });
  }






  filteredTransactions: Transactions[] = [...this.transactions];
  selectedFilter = 'All';
  pageSize = Config.pageSize;
  pageSizeOptions = Config.pageSizeOptions;
  paginateTransactions(): void {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.pageEvent.pageSize : 0;
    const endIndex = this.pageEvent ? startIndex + this.pageEvent.pageSize : 10;
    this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }


  sortData(sort: Sort) {
    const data = this.paginatedTransactions.slice();
    if (!sort.active || sort.direction === '') {
      this.paginatedTransactions = data;
      return;
    }
    this.paginatedTransactions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }




  openDialog(data: Transactions) {
    const dialogRef = this.matDialog.open(DialogueBoxComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}