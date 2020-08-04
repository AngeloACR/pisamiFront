import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";
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
    private router: Router,
    private common: CommonService
  ) {}

  async ngOnInit() {
    await this.auth.logout();
    this.router.navigateByUrl("/");
  }
}
