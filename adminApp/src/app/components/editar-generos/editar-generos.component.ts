import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-editar-generos",
  templateUrl: "./editar-generos.component.html",
  styleUrls: ["./editar-generos.component.scss"]
})
export class EditarGenerosComponent implements OnInit {
  genero: any;
  selectedTitle: any;

  constructor(private common: CommonService, private actRoute: ActivatedRoute) {
    this.actRoute.params.subscribe(params => {
      console.log(params["genero"]);
      if (params["genero"]) {
        this.genero = JSON.parse(params["genero"]);
      }
    });
  }

  ngOnInit() {
    this.selectedTitle = "Editar Género";
  }
}
