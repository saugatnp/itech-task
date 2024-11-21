import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Transactions } from '../../model/transactions.model';

@Component({
  selector: 'app-dialogue-box',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialogue-box.component.html',
  styleUrl: './dialogue-box.component.css'
})
export class DialogueBoxComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Transactions
  ) {
  }

}
