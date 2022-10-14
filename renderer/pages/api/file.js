const fs = require("fs");

export default function handler(req, res) {
  var resText = req.body.text;
  if (req.method === "POST") {
    if (req.body.type === "datos") {
      fs.writeFileSync("datos.txt", resText, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("the datos file was saved!");
      });
    } else {
      fs.writeFileSync("resultados.txt", resText, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("the resultados file was saved!");
      });
    }
  } else {
    resText = "Holi Crayoli";
  }
  res.status(200).json({ text: resText });
}
