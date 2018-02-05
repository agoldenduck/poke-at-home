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

const getHappinessNumber = (pokemon, env) => (
  env.happy.filter(type => pokemon.types.includes(type)).length * 2 +
  env.content.filter(type => pokemon.types.includes(type)).length -
  env.unhappy.filter(type => pokemon.types.includes(type)).length * 5
)

const calcPokemonHappiness = (pokemon, envs) => envs.reduce(
  (tally, env) => tally + getHappinessNumber(pokemon, env), 0
) / pokemon.types.length

const sortPokemonByEnvironments = (pokemon, environments) =>
  [...pokemon].sort((a, b) => calcPokemonHappiness(b, environments) - calcPokemonHappiness(a, environments))

export {
  averageMaxDimension,
  minMaxDimension,
  maxMaxDimension,
  standardDeviationMaxDimension,
  sortPokemonByEnvironments,
}