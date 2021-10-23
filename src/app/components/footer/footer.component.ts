import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  langValue = 'en'

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  onChangeLang(event) {
    const lang = event.target.value

    this.translate.use(lang || 'en')
  }
}
