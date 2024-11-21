import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

  

    constructor(
        private router: Router
    ) {
    }

    setLoginToken() {
        const now = new Date();
        const item = {
            value: 'valid-token',
            expiry: now.getTime() + 3600000
        };
        localStorage.setItem('mock-task-token', JSON.stringify(item));
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

    checkTokenValidity(){
        const token = localStorage.getItem('mock-task-token');
        if (!token) {
            return false;
        }
        const item = JSON.parse(token);
        const now = new Date();
        if (now.getTime() > item.expiry) {
            localStorage.removeItem('mock-task-token');
            return false;
        }
        return true;
    }

    logOut(){
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
          localStorage.removeItem('mock-task-token');
          this.router.navigate(['/home']);
        }
    }



   


}
