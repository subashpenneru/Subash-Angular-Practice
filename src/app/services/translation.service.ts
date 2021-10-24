import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  /**
   * isReady is used to listen a change when ever language changes in application
   */
  public isReady = new BehaviorSubject(false)

  constructor(private translate: TranslateService) {}

  /**
   * This method is used to set the default language in `@ngx-translate/core` library
   * @param lang {String}
   */
  setDefaultLang(lang: string) {
    const val = lang || 'en'

    this.translate.setDefaultLang(val)
  }

  /**
   * This method is used to load the rquired lang json file
   * @param lang {String}
   */
  setLang(lang: string) {
    this.isReady.next(false)

    this.translate.use(lang || 'en').subscribe((res) => {
      this.isReady.next(true)
    })
  }
}
