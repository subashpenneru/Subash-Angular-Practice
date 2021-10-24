import { Component, OnInit } from '@angular/core';

import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  langValue = 'en';

  constructor(private translation: TranslationService) {}

  ngOnInit(): void {}

  onChangeLang(event) {
    const lang = event.target.value;

    this.translation.setLang(lang);
  }
}
