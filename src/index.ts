const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')


app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json());  // Parse les requêtes JSON

app.get('/', (req: any, res: any) => {
  res.send(`Bienvenue sur mon API`);
});

const users = require("./routes/users")
app.use("/users",users)



app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});