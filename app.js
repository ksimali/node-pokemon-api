const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const {success, getUniqueId} = require('./helper');
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
 .use(morgan('dev'))
 .use(express.json())

// Endpoints
app.get('/', (req,res) => res.send('Hello, Express ! '));

// Display all the pokemons
app.get('/api/pokemons', (req,res) =>{
    const totalPokemon = pokemons.length;
    const message = `Il y a ${totalPokemon} pokémons dans le pokédex pour le moment.`;
    if(pokemons) {
        res.json(success(message,pokemons));
    }else {
        res.status(404).send({ error: 'Pokemons not found' });
    }
});

// Display a pokemon by id
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

// Create a pokemon
app.post('/api/pokemons', (req,res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated));
});

// Update a pokemon
app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, ...{id: id}}
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id? pokemonUpdated : pokemon
    });
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`;
    res.json(success(message, pokemonUpdated))
});

// Delete a pokemon
app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé`;
    res.json(success(message, pokemonDeleted));
});

app.listen(port, () => console.log(`Notre application Node est démarré sur : http://localhost:${port}`));