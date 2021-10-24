import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

import { TranslationService } from 'src/app/services/translation.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  titleA = ''
  titleB = ''
  btnA = ''
  btnB = ''

  constructor(
    public translate: TranslateService,
    private translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.translation.isReady.subscribe((ready) => {
      if (ready) {
        this.titleA = this.translate.instant('HOME.SECTIONA.TITLE')
        this.btnA = this.translate.instant('HOME.SECTIONA.READMORE')

        this.translate.get('HOME.SECTIONB.TITLE').subscribe((res) => {
          this.titleB = res
        })
        this.translate.get('HOME.SECTIONB.LEARNMORE').subscribe((res) => {
          this.btnB = res
        })
      }
    })
  }
}
