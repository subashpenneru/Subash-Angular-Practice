import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { v4 as uuid } from 'uuid'

import { Alert } from '../models'

@Injectable({ providedIn: 'root' })
export class AlertService {
  alertMsg = new BehaviorSubject<Alert>(null)

  constructor() {}

  showAlert(alert?: Alert) {
    const {
      type = 'info',
      title = 'Alert Title',
      message = 'Alert Message',
      id = uuid(),
    } = alert
    this.alertMsg.next({ type, title, message, id })
  }
}
