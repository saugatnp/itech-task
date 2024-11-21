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

    getTransactions(): Observable<Array<Transactions>> {
        return this.transactions$;
    }

    addTransaction(transaction: any) {
        const generateUniqueId = () => {
            return Math.random().toString(36).substring(2, 7); // Generates a 5-character alphanumeric string
        };

        const newTransaction = {
            ...transaction,
            id: generateUniqueId()
        };

        const currentTransactions = this.transactionsSubject.value;
        this.transactionsSubject.next([...currentTransactions, newTransaction]);
    }


}
