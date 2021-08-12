import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css'],
})
export class PaginateComponent implements OnInit {
  @Input() totalItems = 1;
  @Input() selectedPage = 1;
  @Output() setPaginate = new EventEmitter<{ perPage: number; page: number }>();
  @Input() pageOptions = [10, 20, 30];
  @Input() selectedPageOption;
  pagination = {
    first: [],
    middle: [],
    last: [],
  };
  totalPages = 1;
  viewFrom = 0;
  viewTo = 0;

  constructor() {}

  ngOnInit(): void {
    this.setTotalPages();
    this.setPagination(this.selectedPage);
  }

  /**
   * This method is used to set the pagination values
   * @param val typeOf number
   * @author Subash
   */
  setPagination(val = this.selectedPage): void {
    let first = [];
    let middle = [];
    let last = [];

    if (this.totalPages <= 4) {
      first = [...Array(this.totalPages)].map((k, i) => i + 1);
    } else {
      first = [1, 2, 3];
      last = [this.totalPages - 2, this.totalPages - 1, this.totalPages];

      if (first.find((e) => e === val)) {
        last = [this.totalPages];
      }

      if (last.find((e) => e === val)) {
        first = [1];
      }

      if (first[first.length - 1] === val) {
        first.push(val + 1);
      }

      if (first[first.length - 1] + 1 === this.totalPages) {
        first.push(this.totalPages);
        last = [];
      }

      if (last[0] === val) {
        last.unshift(val - 1);
      }

      if (val - 2 > 1 && val + 2 < this.totalPages) {
        middle = [val - 1, val, val + 1];
        first = [1];
        last = [this.totalPages];
      }
    }

    this.pagination = { first, middle, last };

    if (this.totalItems > 0) {
      this.viewFrom = (this.selectedPage - 1) * this.selectedPageOption + 1;
      this.viewTo = this.selectedPageOption * this.selectedPage;

      if (this.selectedPage === this.totalPages) {
        this.viewTo = this.totalItems;
      }
    }
  }

  /**
   * This method set the total No.of pages based on total records and selected page option from dropdown
   */
  setTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.selectedPageOption);
  }

  /**
   *
   * @param page typeOf number
   * @returns selected true/false
   */
  selectedClass(page): { selected: boolean } {
    return {
      selected: this.selectedPage === page,
    };
  }

  onSelect(page: number): void {
    this.pageEmit(page);
  }

  onNextPrevIcon(page: number): void {
    this.pageEmit(page);
  }

  onPageOptionSelect(event): void {
    const option = +event.target.value;

    this.selectedPageOption = option;
    this.setTotalPages();
    this.pageEmit();
  }

  pageEmit(page = 1): void {
    this.selectedPage = page;
    this.setPagination(page);
    this.setPaginate.emit({
      perPage: this.selectedPageOption,
      page,
    });
  }
}
