// Carregando Módulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

// Configurações
// Sessão
app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
//

// Middleware

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  }),
);
app.set("view engine", "handlebars");

// Mongoose

const mongoConnection = async () => {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect("mongodb://127.0.0.1/blogapp");
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (error) {
    console.log(
      "Ocorreu um erro ao conectar-se com o banco de dados: " + error,
    );
  }
};

mongoConnection();

// Public
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/admin", admin);

// Outros
const PORT = 8081;
app.listen(PORT, () => {
  console.log("Servidor Rodando...");
});
