import { CommonService } from "../../services/common.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"]
})
export class RatingComponent implements OnInit {
  @Input()
  rating: number;
  isFixed: boolean;
  filledStars: any;
  emptyStars: any;

  constructor(private common: CommonService) {}

  ngOnInit() {
    if (this.rating != -1) {
      this.isFixed = true;
      this.filledStars = Array(this.rating).fill(1);
      this.emptyStars = Array(5 - this.rating).fill(1);
    } else {
      this.isFixed = false;
      this.filledStars = Array(0).fill(1);
      this.emptyStars = Array(5).fill(1);
    }
  }

  selectStars(event, i, fromFilled) {
    let selectedStar = 0;
    if (fromFilled == 0) {
      selectedStar = i + 1;
    } else {
      let currentStars = this.filledStars.length;
      selectedStar = currentStars + i + 1;
    }
    this.filledStars = Array(selectedStar).fill(1);
    this.emptyStars = Array(5 - selectedStar).fill(1);
  }

  enviarRating() {
    let currentStars = this.filledStars.length;
    console.log(`Enviando rating de ${currentStars} estrellas`);
  }
}
