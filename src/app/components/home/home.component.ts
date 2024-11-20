import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { Transactions } from '../../model/transactions.model';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Config } from '../../config';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  transactions: Transactions[] = [];
  paginatedTransactions: Transactions[] = [];

  pageEvent?: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  
  constructor(
    private transactionService : TransactionService
  ){

  }
  ngOnInit(): void {
    this.getTransactionList();
  }

  paginateTransactions(): void {
    const startIndex = this.pageEvent ? this.pageEvent.pageIndex * this.pageEvent.pageSize : 0;
    const endIndex = this.pageEvent ? startIndex + this.pageEvent.pageSize : 10;
    this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageEvent = event;
      this.paginateTransactions();
    });
  }

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

  filteredTransactions: Transactions[] = [...this.transactions];
  selectedFilter = 'All';
  pageSize = Config.pageSize;
  pageSizeOptions = Config.pageSizeOptions;

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
    this.paginateTransactions();
  }

}
