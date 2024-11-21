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

    /**
     * 
     * @param message  message to be displayed
     * @param action  action performed
     */
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
        });
    }
}