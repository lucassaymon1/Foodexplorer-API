exports.up = knex => knex.schema.createTable("foods", table => {

  table.increments("id")
  table.text("name").notNullable()
  table.float("price").notNullable()
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.text("picture")
  table.text("description")
  table.text("category")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("foods")
