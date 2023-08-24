const db = require("./db");

function insertRow() {
  const [name, shark_id] = process.argv.slice(2);
  db.run(
    `INSERT INTO sea (name, shark_id) VALUES (?, ?)`,
    [name, shark_id],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

insertRow();