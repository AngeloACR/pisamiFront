import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from "@angular/router";

@Component({
  selector: "app-editar-usuarios",
  templateUrl: "./editar-usuarios.component.html",
  styleUrls: ["./editar-usuarios.component.scss"]
})
export class EditarUsuariosComponent implements OnInit {
  user: any;
  selectedTitle: any;
  constructor(private common: CommonService, private actRoute: ActivatedRoute) {
    this.actRoute.params.subscribe(params => {
      console.log(params["user"]);
      if (params["user"]) {
        this.user = JSON.parse(params["user"]);
      }
    });
  }

  ngOnInit() {
    this.selectedTitle = "Editar Usuario";
  }
}
