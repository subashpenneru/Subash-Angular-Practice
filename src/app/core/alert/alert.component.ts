import { Component, HostBinding, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Alert } from '../models'
import { AlertService } from './alert.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @HostBinding('class') _class = 'app-alert'
  public alerts: Alert[] = []

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertMsg.subscribe((res: Alert) => {
      this.alerts.push(res)

      const timeout = setTimeout(() => {
        this.removeAlert(res.id)
        clearTimeout(timeout)
      }, environment.alertTimeout * 1000)
    })
  }

  removeAlert(id: string) {
    this.alerts = this.alerts.filter((alert) => alert.id !== id)
  }
}
