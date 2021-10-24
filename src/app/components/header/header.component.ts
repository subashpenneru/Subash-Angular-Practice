import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public accBtnText: Observable<any>;
  public text = '';

  constructor(
    private translation: TranslationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translation.isReady.subscribe((ready) => {
      if (ready) {
        this.accBtnText = this.translate.get('HEADER.ACC-BTN');

        this.text = this.translate.instant('HEADER.ACC-BTN');
        console.log(this.text);
      }
    });
  }
}
