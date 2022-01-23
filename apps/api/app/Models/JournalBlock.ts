import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import NoteBlock from "./NoteBlock";
import Block from "./Block";

export default class JournalBlock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @hasMany(() => NoteBlock)
  public notes: HasMany<typeof NoteBlock>;

  @column()
  blockId: number;

  @belongsTo(() => Block)
  public block: BelongsTo<typeof Block>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
