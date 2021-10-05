const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded());

const pokedex = [];
let message = ""

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {    
      setTimeout(() => {
        message = "";
      }, 1000);
      res.render("index", {
      pokedex,
      message,
      
    });
  });

app.get("/details/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokedex[id];
  res.render("details", {
    pokemon,
    
  });
});


app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});
  
app.post("/cadastrar", (req, res) => {
    const {numero, nome, tipo, imagem, descricao, altura, peso, categoria, habilidade} = req.body
    let obj = {numeo: numero, nome: nome, tipo: tipo, imagem: imagem, descricao: descricao, altura: altura, peso: peso, categoria: categoria, habilidade: habilidade};
    pokedex.push(obj);
    
    res.redirect("/");
}); 

  

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);