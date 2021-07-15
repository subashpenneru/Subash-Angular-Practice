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
  public totalPages = 0;
  public data = [];
  public todoData = [];

  constructor(private tableUserService: TableUsersService) {}

  ngOnInit(): void {
    this.getPassengersData();
  }

  getPassengersData() {
    this.loading = true;
    this.tableUserService
      .getUsers(this.selectedPage - 1, this.selectedPerPage)
      .subscribe(
        (res: any) => {
          this.data = this.transformData(JSON.parse(JSON.stringify(res.data)));
          this.totalPages = res.totalPassengers;
          this.todoData = this.data;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
  }

  transformData(data = []) {
    return data.map((ele) => ({
      passName: ele.name,
      passTrips: ele.trips,
      airlineName: this.getAirlineInfo(ele.airline, "name"),
      airlineCtry: this.getAirlineInfo(ele.airline, "country"),
      established: this.getAirlineInfo(ele.airline, "established"),
      id: ele._id,
      _id: ele._id,
    }));
  }

  getAirlineInfo(data, key: string) {
    return data ? (data[0] ? data[0][key] : data[key]) : "";
  }

  pageEvent({ perPage, page }) {
    this.selectedPage = page;
    this.selectedPerPage = perPage;

    this.getPassengersData();
    // this.todoData = this.data.slice((page - 1) * perPage, page * perPage);
  }

  getIndex(id) {
    return (this.selectedPage - 1) * this.selectedPerPage + id + 1;
  }

  onDelete(id) {
    this.data = this.data.filter((ele) => ele.id !== id);
    this.todoData = this.data.slice(
      (this.selectedPage - 1) * this.selectedPerPage,
      this.selectedPage * this.selectedPerPage
    );
  }
}
