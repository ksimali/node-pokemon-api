const express = require('express');
let pokemons = require('./mock-pokemons');

const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('Hello, Express ! '));

app.get('/api/pokemons', (req,res) =>{
    const totalPokemon = pokemons.length;
    res.json({
        message: `Il y a ${totalPokemon} pokémons dans le pokédex pour le moment.`,
        data: pokemons
    });
});

app.get('/api/pokemons/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id == id);
    
    if(pokemon) {
        res.json(pokemon);
    }else{
        res.status(404).send({ error: 'Pokemon not found' });
    }
});

app.listen(port, () => console.log(`Notre application Node est démarré sur : http://localhost:${port}`));