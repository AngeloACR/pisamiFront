import { CommonService } from "../../services/common.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private common: CommonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigateByUrl("/");
    localStorage.clear();

  }
}
