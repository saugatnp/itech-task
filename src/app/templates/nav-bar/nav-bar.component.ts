import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faList, faListCheck, faFolder, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/auth.service';
import { SnackBarService } from '../../service/snack-bar-service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIcon,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  faList = faList;
  faListCheck = faListCheck;
  faFolder = faFolder;
  faArrowRightFromBracket = faArrowRightFromBracket;
  showNavbar: boolean = true;
  openNavBar: boolean = true;
  isMobileView: boolean = false;
  currentRoute = '';


  is_open: boolean = true;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBarService: SnackBarService
  ) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects || event.url;
        const currentRouteData = this.router.routerState.snapshot.root.firstChild?.data;
        this.showNavbar = currentRouteData?.['showNavbar'] ?? true;
      }
    });


  }
  ngOnInit(): void {
    this.checkWindowSize();
  }

  isActive(link: string): boolean {
    return this.currentRoute === link;
  }

  logout(){
    this.auth.logOut();
    this.snackBarService.openSnackBar('Logged Out successfully!', 'Close');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    if (window.innerWidth <= 768) {
      this.openNavBar = true;
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

  openNavBarToggle(){
    if(this.isMobileView){
      this.openNavBar = false;
    }
  }

}