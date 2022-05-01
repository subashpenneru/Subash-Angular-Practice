import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnDestroy {
  show = true;

  constructor(private router: Router) {}

  onClose() {
    console.log(this);

    this.router.navigateByUrl('/servers');
  }

  ngOnDestroy(): void {
    this.show = false;
  }
}
