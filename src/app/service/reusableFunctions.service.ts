import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ReusableFunctionsService {

    constructor(
        private router: Router
    ) { }

    setLoginToken() {
        const now = new Date();
        const item = {
            value: 'valid-token',
            expiry: now.getTime() + 100000
        };
        localStorage.setItem('mock-task-token', JSON.stringify(item));
        this.router.navigate(['/']);
    }


    getLoginToken() {
        const token = localStorage.getItem('mock-task-token');
        if (!token) {
            return null;
        }
        const item = JSON.parse(token);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem('mock-task-token');
            return null;
        }
        return item.value;
    }
}