// const { sequelize } = require("../../config/connection");

class Queries {
  /**
   * it will initialize our queries by passed db object and returns their results
   * @type {function}
   * @function getData
   * @param {object} { tables, columns, relations }
   */
  static async getData(db) {
    const tables = await this.GetAllTables(db)
    const columns = await this.GetCoulmnsFromEntity(db)
    const relations = await this.GetRelations(db)

    return {
      tables,
      columns,
      relations,
    }
  }

  /**
   * it will run a query to get all tables
   * @type {function}
   * @function GetAllTables
   * @param {object} db
   * @return {object} db
   */
  static async GetAllTables(db) {
    const response = await db.sequelize
      .query(`SELECT table_schema as "TABLE_SCHEMA", table_name as "TABLE_NAME", table_catalog as "DB_NAME"
    from INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE = 'BASE TABLE'
    AND table_schema not in ('pg_catalog', 'information_schema');
   `)

    const tables = []
    response[0].forEach((val) => {
      if (val.TABLE_NAME !== 'SequelizeMeta') {
        tables.push(val.TABLE_NAME)
      }
    })

    return tables
  }

  /**
   * it will run a query to get columns of tables
   * @type {function}
   * @function GetCoulmnsFromEntity
   * @param {object} db
   * @return {object} db
   */
  static async GetCoulmnsFromEntity(db) {
    const ret = {}

    const response = await db.sequelize
      .query(`SELECT table_name,column_name,udt_name,column_default,is_nullable,
                      data_type,character_maximum_length,numeric_precision,numeric_scale,
                      case when column_default LIKE 'nextval%' then 'YES' else 'NO' end isidentity,
                      is_identity,
                      (SELECT count(*)
                    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
                        inner join INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE cu
                            on cu.CONSTRAINT_NAME = tc.CONSTRAINT_NAME
              where
                  tc.CONSTRAINT_TYPE = 'UNIQUE'
                  and tc.TABLE_NAME = c.TABLE_NAME
                  and cu.COLUMN_NAME = c.COLUMN_NAME
                  and tc.TABLE_SCHEMA=c.TABLE_SCHEMA) IsUnique,
                  (SELECT
                      string_agg(enumlabel, ',')
                      FROM "pg_enum" "e"
                      INNER JOIN "pg_type" "t" ON "t"."oid" = "e"."enumtypid"
                      INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace"
                      WHERE "n"."nspname" = table_schema AND "t"."typname"=udt_name
                  ) enumValues
                      FROM INFORMATION_SCHEMA.COLUMNS c
                      where table_schema not in ('pg_catalog', 'information_schema');
                      `)

    response[0].map((val) => {
      if (val.table_name !== 'SequelizeMeta') {
        ;(ret[val.table_name] || (ret[val.table_name] = [])).push(val)
      }
    })

    return ret
  }

  /**
   * it will run a query to get relations of tables
   * @type {function}
   * @function GetRelations
   * @param {object} db
   * @return {object} db
   */
  static async GetRelations(db) {
    const response = await db.sequelize.query(`SELECT DISTINCT
    con.relname AS tablewithforeignkey,
    att.attnum as fk_partno,
         att2.attname AS foreignkeycolumn,
      cl.relname AS tablereferenced,
      att.attname AS foreignkeycolumnreferenced,
      delete_rule as ondelete,
      update_rule as onupdate,
        concat(con.conname,con.conrelid,con.confrelid) as object_id
       FROM (
           SELECT
             unnest(con1.conkey) AS parent,
             unnest(con1.confkey) AS child,
             con1.confrelid,
             con1.conrelid,
             cl_1.relname,
           con1.conname,
           nspname
           FROM
             pg_class cl_1,
             pg_namespace ns,
             pg_constraint con1
           WHERE
             con1.contype = 'f'::"char"
             AND cl_1.relnamespace = ns.oid
             AND con1.conrelid = cl_1.oid
             and nspname not in ('pg_catalog', 'information_schema')
      ) con,
        pg_attribute att,
        pg_class cl,
        pg_attribute att2,
        information_schema.referential_constraints rc
      WHERE
        att.attrelid = con.confrelid
        AND att.attnum = con.child
        AND cl.oid = con.confrelid
        AND att2.attrelid = con.conrelid
        AND att2.attnum = con.parent
        AND rc.constraint_name= con.conname AND constraint_catalog=current_database() AND rc.constraint_schema=nspname
        `)

    // console.log(response[0], "***************");
    return response[0]
  }
}

module.exports = { Queries }
