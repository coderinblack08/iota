import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Block from "./Block";
import JournalBlock from "./JournalBlock";

export default class NoteBlock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  content?: any;

  @column()
  journalId?: number;

  @column()
  blockId?: number;

  @belongsTo(() => Block)
  public block: BelongsTo<typeof Block>;

  @belongsTo(() => JournalBlock)
  public journal: BelongsTo<typeof JournalBlock>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
