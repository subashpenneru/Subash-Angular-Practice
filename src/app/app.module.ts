import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ChildComponent } from './child/child.component';
import { PaginateComponent } from './paginate/paginate.component';
import { TableUsersComponent } from './table-users/table-users.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    ChildComponent,
    PaginateComponent,
    TableUsersComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
