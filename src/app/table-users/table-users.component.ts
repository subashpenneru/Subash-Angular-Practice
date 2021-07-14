import { Component, OnInit } from "@angular/core";
import { TableUsersService } from "./table-users.service";

@Component({
  selector: "app-table-users",
  templateUrl: "./table-users.component.html",
  styleUrls: ["./table-users.component.css"],
})
export class TableUsersComponent implements OnInit {
  public loading = true;
  public selectedPage = 1;
  public selectedPerPage = 10;
  public data = [];
  public todos = [];

  constructor(private tableUserServ: TableUsersService) {}

  ngOnInit(): void {
    this.tableUserServ.getUsers().subscribe(
      (res: any) => {
        this.data = JSON.parse(JSON.stringify(res));
        this.todos = this.data.slice(0, 10);
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  pageEvent({ perPage, page }) {
    this.selectedPage = page;
    this.selectedPerPage = perPage;
    this.todos = this.data.slice((page - 1) * perPage, page * perPage);
  }

  onDelete(id) {
    const _data = JSON.parse(JSON.stringify(this.data));

    this.data = _data.filter((ele) => ele.id !== id);
    this.todos = this.data.slice(
      (this.selectedPage - 1) * this.selectedPerPage,
      this.selectedPage * this.selectedPerPage
    );
  }
}
