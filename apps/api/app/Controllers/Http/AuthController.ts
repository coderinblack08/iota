import { AllyUserContract, GithubToken, GoogleToken } from "@ioc:Adonis/Addons/Ally";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import { nanoid } from "nanoid";

export default class AuthController {
  private async createNewUser(
    strategy: "github" | "google",
    { id, name, email, avatarUrl }: AllyUserContract<GithubToken | GoogleToken>
  ) {
    const tokenObject = strategy === "google" ? { googleId: id } : { githubId: id };
    return User.firstOrCreate(tokenObject, {
      displayName: name,
      username: name + "-" + nanoid(8),
      avatarUrl,
      email,
      ...tokenObject,
    });
  }

  public async user({ auth }: HttpContextContract) {
    return auth.user!.serialize();
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use("web").logout();
    return { message: "Successfully logged out" };
  }

  public async githubCallback({ auth, ally, response }: HttpContextContract) {
    const github = ally.use("github");

    if (github.accessDenied()) {
      return "Access was denied";
    }

    if (github.stateMisMatch()) {
      return "Request expired. Retry again";
    }

    if (github.hasError()) {
      return github.getError();
    }

    const user = await this.createNewUser("github", await github.user());
    await auth.loginViaId(user.id, true);

    return response.redirect("http://localhost:3000/workspace");
  }

  public async googleCallback({ auth, ally, response }: HttpContextContract) {
    const google = ally.use("google");
    if (google.accessDenied()) {
      return "Access was denied";
    }

    if (google.stateMisMatch()) {
      return "Request expired. Retry again";
    }

    if (google.hasError()) {
      return google.getError();
    }

    const user = await this.createNewUser("google", await google.user());
    await auth.loginViaId(user.id, true);

    return response.redirect("http://localhost:3000/workspace");
  }
}
