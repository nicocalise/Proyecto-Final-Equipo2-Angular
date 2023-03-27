import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  options = [  { name: 'Home', route: '/home' },  { name: 'About Us', route: '/about-us' },  { name: 'User', route: '/user' }, { name: 'Log in', route: '/login' } ];

  onMenuItemClick(event: MouseEvent, menuItem: { name: string, route: string }) {
    //this.menuTrigger.closeMenu(); // close the menu
    this.router.navigateByUrl(menuItem.route); // navigate to the selected route
    event.preventDefault(); // prevent the default link behavior
  }

  constructor(private router: Router, private menuTrigger: MatMenuModule) { }
}
