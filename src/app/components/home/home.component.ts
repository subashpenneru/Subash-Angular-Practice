import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

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

  constructor(public translate: TranslateService) {
    translate.onLangChange.subscribe((res) => {
      setTimeout(() => {
        this.titleA = translate.instant('HOME.SECTIONA.TITLE')
        this.btnA = translate.instant('HOME.SECTIONA.READMORE')
      }, 0)

      translate.get('HOME.SECTIONB.TITLE').subscribe((res) => {
        this.titleB = res
      })
      translate.get('HOME.SECTIONB.LEARNMORE').subscribe((res) => {
        this.btnB = res
      })
    })
  }

  ngOnInit(): void {}
}
