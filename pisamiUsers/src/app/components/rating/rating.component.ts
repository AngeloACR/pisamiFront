import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

@Input()
rating: number;

filledStars: any;
emptyStars: any;

  constructor() { }

  ngOnInit() {
    this.filledStars = Array(this.rating).fill(1);
    this.emptyStars = Array(5-this.rating).fill(1);
  }

}
