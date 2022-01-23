import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import AlbumBlock from "./AlbumBlock";
import Block from "./Block";

export default class ImageBlock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  url: string;

  @column()
  albumId?: number;

  @column()
  blockId?: number;

  @belongsTo(() => Block)
  public block: BelongsTo<typeof Block>;

  @belongsTo(() => AlbumBlock)
  public album: BelongsTo<typeof AlbumBlock>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
