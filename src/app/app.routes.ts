    import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

    export const routes: Routes = [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        {
            path: 'home',
            loadComponent: () =>
                import('../app/components/home/home.component').then(
                    (m) => m.HomeComponent
                )
        },
        {
            path: 'login',
            loadComponent: () =>
                import('../app/components/login/login.component').then(
                    (m) => m.LoginComponent
                ),data: { showNavbar: false }
        },
        {
            path: 'entry',
            loadComponent: () =>
                import('../app/components/entry/entry.component').then(
                    (m) => m.EntryComponent
                ) , canActivate: [authGuard]
        },
    ];
