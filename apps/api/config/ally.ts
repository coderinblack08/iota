/**
 * Config source: https://git.io/JOdi5
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from "@ioc:Adonis/Core/Env";
import { AllyConfig } from "@ioc:Adonis/Addons/Ally";

/*
|--------------------------------------------------------------------------
| Ally Config
|--------------------------------------------------------------------------
|
| The `AllyConfig` relies on the `SocialProviders` interface which is
| defined inside `contracts/ally.ts` file.
|
*/
const allyConfig: AllyConfig = {
  /*
	|--------------------------------------------------------------------------
	| Github driver
	|--------------------------------------------------------------------------
	*/
  github: {
    driver: "github",
    clientId: Env.get("GITHUB_CLIENT_ID"),
    clientSecret: Env.get("GITHUB_CLIENT_SECRET"),
    callbackUrl: "http://localhost:4000/github/callback",
  },
  /*
	|--------------------------------------------------------------------------
	| Google driver
	|--------------------------------------------------------------------------
	*/
  google: {
    driver: "google",
    clientId: Env.get("GOOGLE_CLIENT_ID"),
    clientSecret: Env.get("GOOGLE_CLIENT_SECRET"),
    callbackUrl: "http://localhost:4000/google/callback",
  },
  /*
	|--------------------------------------------------------------------------
	| Twitter driver
	|--------------------------------------------------------------------------
	*/
  twitter: {
    driver: "twitter",
    clientId: Env.get("TWITTER_CLIENT_ID"),
    clientSecret: Env.get("TWITTER_CLIENT_SECRET"),
    callbackUrl: "http://localhost:4000/twitter/callback",
  },
};

export default allyConfig;
