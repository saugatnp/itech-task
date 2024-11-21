import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar
    ) {

    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
        });
    }
}