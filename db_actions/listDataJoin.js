const db = require("./db");

function selectRows() {
  db.each(`SELECT sk.name, s.name as sea FROM sharks sk FULL JOIN sea s ON  sk.id = s.shark_id`, (error, row) => {
    if (error) {
      throw new Error(error.message);
    }
    console.log(row);
  });
}

selectRows();