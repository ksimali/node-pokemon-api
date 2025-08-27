const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const {success} = require('./helper');
let pokemons = require('./mock-pokemons');

const app = express();
const port = 3000;

/** middleware to log all receive requests
app.use((req, res, next) => {
    console.log(`URL : ${req.url}`);
    next();
});
*/
app
 .use(favicon(__dirname + '/favicon.ico'))
 .use(morgan('dev'));

// Endpoints
app.get('/', (req,res) => res.send('Hello, Express ! '));

app.get('/api/pokemons', (req,res) =>{
    const totalPokemon = pokemons.length;
    const message = `Il y a ${totalPokemon} pokémons dans le pokédex pour le moment.`;
    if(pokemons) {
        res.json(success(message,pokemons));
    }else {
        res.status(404).send({ error: 'Pokemons not found' });
    }
});

app.get('/api/pokemons/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id == id);
    const message = 'Un pokémon a bien été trouvé.';
    if(pokemon) {
        res.json(success(message, pokemon));
    }else{
        res.status(404).send({ error: 'Pokemon not found' });
    }
});

app.listen(port, () => console.log(`Notre application Node est démarré sur : http://localhost:${port}`));