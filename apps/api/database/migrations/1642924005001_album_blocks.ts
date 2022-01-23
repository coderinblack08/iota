import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Albums extends BaseSchema {
  protected tableName = "album_blocks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("block_id").unsigned().references("blocks.id");
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
