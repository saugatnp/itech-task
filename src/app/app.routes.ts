import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () =>
            import('../app/components/login/login.component').then(
                (m) => m.LoginComponent
            ),data: { showNavbar: false }
    },
];
