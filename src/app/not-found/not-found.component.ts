import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-not-found",
  template: `<h2>{{ errorMessage }}</h2>`,
})
export class NotFoundComponent {
  errorMessage: string;

  constructor(private route: ActivatedRoute) {
    this.errorMessage = this.route.snapshot.data["message"];
    this.route.data.subscribe((res) => (this.errorMessage = res.message));
  }
}
