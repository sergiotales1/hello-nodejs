// Express install
const express = require('express');
const app = express();
// Taking the db
const Post = require('./models/Post');
// Body-parser install
const bodyParser = require('body-parser');
// Handle-bars install
const handlebars = require('express-handlebars').engine;

// Run body-parser as a middleware right after the request it changes the req body to make params and variables legible, exposing them, so we can use into our code
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// template engine setup (handlebars)
app.engine(
  'handlebars',
  handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
  Post.findAll({
    order: [['id', 'DESC']],
  }).then((posts) => res.render('home', { posts }));
});

app.get('/cad', (req, res) => {
  res.render('form');
});

app.post('/add', (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(() => res.redirect('/'))
    .catch((error) => res.send('Não foi possível cadastrar sua postagem'));
});

app.get('/remove/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.send('Postagem deletada com sucesso'))
    .catch((error) => console.log('Error: ' + error));
});

app.listen('8081', () => {
  console.log('Servidor rodando!');
});
