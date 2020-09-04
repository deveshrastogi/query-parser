const queryStrs = [`UPDATE "VpaAccounts" SET "isPrimary"=true,"updatedAt"='2020-09-04 11:47:30.442 +00:00' WHERE "VpaId" = 'Aaf1260d23e94db5951d8c84e132786' AND "AccountId" = 'A8abefd4c5924df59688e74088bac9d' RETURNING *`]

const parser = require('pg-query-parser');
const R = require("ramda")

for (let queryStr of queryStrs) {
  try {
    const query = parser.parse(queryStr).query;
    // console.log(JSON.stringify(query))
    let whereClause = query[0].UpdateStmt.whereClause
    let key
    if (whereClause.BoolExpr) {
      let args = whereClause.BoolExpr.args
      let keys = R.map(arg => arg.A_Expr.lexpr.ColumnRef.fields.pop().String.str, args)
      key = keys.join(", ")
    } else {
      key = whereClause.A_Expr.lexpr.ColumnRef.fields.pop().String.str
    }
    console.log(key);
  } catch (err) {
    console.log("ERRRRR")
  }
}