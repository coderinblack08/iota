import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public email: string;

  @column()
  public displayName: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public googleId?: string;

  @column({ serializeAs: null })
  public twitterId?: string;

  @column({ serializeAs: null })
  public githubId?: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
