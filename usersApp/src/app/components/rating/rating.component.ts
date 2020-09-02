import { CommonService } from "../../services/common.service";
import { UserService } from "../../services/user.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.scss"],
  providers: [UserService]
})
export class RatingComponent implements OnInit {
  @Input()
  rating : number;
  isFixed: boolean;
  filledStars: any;
  emptyStars: any;
  @Input() 
  perfilId: number;
  estar : number;
  

  constructor(private common: CommonService, private _userService: UserService) {}

  ngOnInit() {
    if (this.rating != -1) {
      this.isFixed = true;
      this.filledStars = [];
      for(let i = 1 ; i <= this.rating;i++){
        this.filledStars.push(1);
      }
      console.log(this.filledStars);
      this.emptyStars = [];
      for(let i = 1 ; i <= 5 - this.rating;i++){
        this.emptyStars.push(1);
      }
     // this.emptyStars = Array(5 - this.rating).fill(1);
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
    let identity = JSON.parse(localStorage.getItem('identity'));
    this._userService.calificar(identity.userId,this.perfilId,currentStars).subscribe(response =>{
      console.log(response);
      console.log(`Enviando rating de ${currentStars} estrellas`);
    });
    this.common.showAlert("calificado correctamente");
    
    
  }
}
