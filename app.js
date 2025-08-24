const express = require('express');

const app = express();
const port = 3000;

// Example data
const pokemons = [
    { id: 1, name: 'Bulbasaur', type: 'Grass/Poison' },
    { id: 2, name: 'Ivysaur', type: 'Grass/Poison' },
    { id: 3, name: 'Charmander', type: 'Fire' },
  ];

app.get('/', (req,res) => res.send('Hello, Express ! '));

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