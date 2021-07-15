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
  public todoData = [];

  constructor(private tableUserService: TableUsersService) {}

  ngOnInit(): void {
    this.tableUserService.getUsers().subscribe(
      (res: any) => {
        this.data = JSON.parse(JSON.stringify(res));
        this.todoData = this.data.slice(0, 10);
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
    this.todoData = this.data.slice((page - 1) * perPage, page * perPage);
  }

  onDelete(id) {
    this.data = this.data.filter((ele) => ele.id !== id);
    this.todoData = this.data.slice(
      (this.selectedPage - 1) * this.selectedPerPage,
      this.selectedPage * this.selectedPerPage
    );
  }
}
