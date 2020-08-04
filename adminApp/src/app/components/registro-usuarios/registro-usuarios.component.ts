import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registro-usuarios",
  templateUrl: "./registro-usuarios.component.html",
  styleUrls: ["./registro-usuarios.component.scss"]
})
export class RegistroUsuariosComponent implements OnInit {
  selectedTitle: any;
  constructor(private common: CommonService) {}

  ngOnInit() {
    this.selectedTitle = "Registro de Usuario";
  }
}
