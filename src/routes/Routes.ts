import AccountController from "@controllers/AccountController";
import LoginController from "@controllers/LoginController";
import { Request, Response, Application } from "express";

export class Routes {
  public loginController: LoginController = new LoginController();
  public accountController: AccountController = new AccountController();

  public routes(app: Application): void {
    app.route("/account").post(this.accountController.postCreate);

    app.route("/login").get(this.loginController.postAuthenticate);
  }
}