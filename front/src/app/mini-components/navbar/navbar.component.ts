import { AfterViewInit, Component, ViewChild, HostListener  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSidenav } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  showNavbar = true;
  isSidenavOpen = false;
  isMobile = window.innerWidth < 768;


  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNavbar = !this.router.url.includes('landingPage');
    })
   }

   ngAfterViewInit() {
       this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.sidenav?.close();
    }
  }

  

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav() {
    this.isSidenavOpen = false;
  }

  logout() {
    console.log('Déconnexion...');
  }
}
