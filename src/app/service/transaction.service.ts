import { Injectable } from '@angular/core';
import { Transactions } from '../model/transactions.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {

    private transactionsSubject = new BehaviorSubject<Transactions[]>([]);
    transactions$ = this.transactionsSubject.asObservable();
    private nextId: number = 1;

    constructor(
        private http: HttpClient
    ) {
        this.getTransactionsFromFile();
    }



    /**
     * Get transactions from the file
     */
    getTransactionsFromFile() {
        this.http.get<Array<Transactions>>('assets/data/transaction.json').subscribe({
            next: (data) => {
                this.transactionsSubject.next(data);
            },
            error: (error) => {
                console.error(error);
            }
        });
    }


    /**
     * 
     * @returns the list of transactions as observable
     */
    getTransactions(): Observable<Array<Transactions>> {
        return this.transactions$;
    }


    /**
     * 
     * @param transaction the transaction to be added
     */
    addTransaction(transaction: any) {
        const generateUniqueId = () => {
            return Math.random().toString(36).substring(2, 7);
        };

        const newTransaction = {
            ...transaction,
            id: generateUniqueId()
        };

        const currentTransactions = this.transactionsSubject.value;
        this.transactionsSubject.next([...currentTransactions, newTransaction]);
    }


}