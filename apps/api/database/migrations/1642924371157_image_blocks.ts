import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ImageBlocks extends BaseSchema {
  protected tableName = "image_blocks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("url");
      table.integer("album_id").references("album_blocks.id").unsigned().nullable();
      table.integer("block_id").references("blocks.id").unsigned().nullable();
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
