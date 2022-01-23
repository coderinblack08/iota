import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Notes extends BaseSchema {
  protected tableName = "note_blocks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.json("content").nullable();
      table.integer("journal_id").unsigned().nullable();
      table.integer("block_id").unsigned().nullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
