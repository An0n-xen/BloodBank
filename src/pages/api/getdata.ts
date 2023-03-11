import mysql from "mysql2/promise";

export default async function handler(req: any, res: any) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "assignments",
    user: "root",
    password: "Genesis begins",
  });

  try {
    if (req.method === "POST") {
      console.log(req.method);
      const pQuery = req.body.query;
      const values: any = [];
      const query = pQuery;
      const [data] = await dbconnection.execute(pQuery, values);
      res.status(200).json({ data: data });
    } else {
      const query = "SELECT * from users";
      const values: any = [];
      const [data] = await dbconnection.execute(query, values);
      dbconnection.end();
      res.status(200).json({ data: data });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
