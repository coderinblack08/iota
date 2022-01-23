import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import ImageBlock from "./ImageBlock";
import NoteBlock from "./NoteBlock";

export enum BlockType {
  Note = "note",
  Chat = "chat",
  Image = "image",
  Album = "album",
  Journal = "journal",
}

export default class Block extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public type: BlockType;

  @column()
  level: number;

  @column()
  width: number;

  @column()
  height: number;

  @hasOne(() => ImageBlock)
  public image: HasOne<typeof ImageBlock>;

  @hasOne(() => NoteBlock)
  public note: HasOne<typeof NoteBlock>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
