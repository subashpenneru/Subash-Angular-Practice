import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formName = 'Template-Driven';
  isTemplate = true;
  showAlert = false;
  userName: string;

  onCloseAlert() {
    this.showAlert = false;
  }

  getUserName(name) {
    this.showAlert = true;
    this.userName = name;
  }
}
