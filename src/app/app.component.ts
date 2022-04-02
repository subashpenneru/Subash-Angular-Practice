import { Component, OnInit } from '@angular/core'

import { AlertService } from './core/alert/alert.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private alertServ: AlertService) {}

  ngOnInit(): void {
    this.alertServ.showAlert({
      message: 'Application loaded successfully!',
      type: 'success',
    })

    setTimeout(() => {
      this.alertServ.showAlert({
        message: 'Api Failed!',
        type: 'danger',
      })
    }, 2000)
  }
}
