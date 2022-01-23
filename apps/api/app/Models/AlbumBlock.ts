import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Block from "./Block";
import ImageBlock from "./ImageBlock";

export default class AlbumBlock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => ImageBlock)
  public images: HasMany<typeof ImageBlock>;

  @column()
  blockId: number;

  @belongsTo(() => Block)
  public block: BelongsTo<typeof Block>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
