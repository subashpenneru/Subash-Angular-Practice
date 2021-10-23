import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public accBtnText: Observable<any>
  public text = ''

  constructor(public translate: TranslateService) {
    translate.onLangChange.subscribe((res) => {
      this.accBtnText = translate.get('HEADER.ACC-BTN')

      setTimeout(() => {
        this.text = translate.instant('HEADER.ACC-BTN')
        console.log(this.text)
      }, 0)
    })
  }

  ngOnInit(): void {}
}
