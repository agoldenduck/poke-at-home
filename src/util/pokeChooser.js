const extractNumber = numString => Number(numString.split(/[km ]/i)[0])

const averageMaxDimension = (pokemon, dimension) =>
  pokemon.reduce((tally, poke) => tally + extractNumber(poke[dimension].maximum), 0) / pokemon.length

const standardDeviationMaxDimension = (pokemon, dimension) => {
  const avgMaxWt = averageMaxDimension(pokemon, dimension)
  return Math.sqrt(
    pokemon
      .map(poke => Math.pow(extractNumber(poke[dimension].maximum) - avgMaxWt, 2))
      .reduce((tally, squareDiff) => tally + squareDiff, 0) / pokemon.length
  )
}

const minMaxDimension = (pokemon, dimension) =>
  pokemon.reduce(
    (min, poke) =>
      min < extractNumber(poke[dimension].maximum) ? min : extractNumber(poke[dimension].maximum),
    extractNumber(pokemon[0][dimension].maximum)
  )

const maxMaxDimension = (pokemon, dimension) =>
  pokemon.reduce(
    (max, poke) =>
      max > extractNumber(poke[dimension].maximum) ? max : extractNumber(poke[dimension].maximum),
    extractNumber(pokemon[0][dimension].maximum)
  )

const calcPokemonHappiness = (pokemon, envs) => envs.reduce(
  (tally, env) =>
    tally +
    env.happy.filter(type => pokemon.types.includes(type)).length -
    env.unhappy.filter(type => pokemon.types.includes(type)).length * 5,
  0
)

const sortPokemonByEnvironments = (pokemon, environments) => {
  pokemon.forEach(poke => console.log(poke.name, calcPokemonHappiness(poke, environments)))
}

export {
  averageMaxDimension,
  minMaxDimension,
  maxMaxDimension,
  standardDeviationMaxDimension,
  sortPokemonByEnvironments
}
