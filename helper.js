exports.success = (message, data) => {
    return {
        message: message, 
        data: data
    }     
}

// Method getUniqueId to generate a unique id
exports.getUniqueId = (pokemons) => {
    const pokemonIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonIds.reduce((a,b)=> Math.max(a,b))
    const uniqueId = maxId + 1

    return uniqueId
}




