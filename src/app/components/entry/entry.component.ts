import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { SnackBarService } from '../../service/snack-bar-service';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private transactionService: TransactionService,
    private snackBarService : SnackBarService
  ) {
    this.transactionForm = this.fb.group({
      createdDate: ['', Validators.required],
      lastModifiedDate: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      remarks: ['', Validators.required],
      status: ['', [Validators.required, Validators.pattern(/^(Pending|Completed|Failed)$/)]]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.addTransaction(this.transactionForm.value);
      this.transactionForm.reset();
      this.snackBarService.openSnackBar('Transaction added successfully!', 'Close');
    }
  }

  onCancel(){

  }
}
