const extractNumber = numString => Number(numString.split(/[km ]/i)[0])

const averageMaxDimension = (pokemon, dimension) =>
  pokemon.reduce((tally, poke) => tally + extractNumber(poke[dimension].maximum), 0) / pokemon.length

const standardDeviationMaxDimension = (pokemon, dimension) => {
  const AvgMaxDim = averageMaxDimension(pokemon, dimension)
  return Math.sqrt(
    pokemon
      .map(poke => Math.pow(extractNumber(poke[dimension].maximum) - AvgMaxDim, 2))
      .reduce((tally, squareDiff) => tally + squareDiff, 0) / pokemon.length
  )
}

const minMaxDimension = (pokemon, dimension) =>
  pokemon.reduce(
    (min, poke) => {
      const dimensionVal = extractNumber(poke[dimension].maximum)
      return min < dimensionVal ? min : dimensionVal
    },
    extractNumber(pokemon[0][dimension].maximum)
  )

const maxMaxDimension = (pokemon, dimension) =>
  pokemon.reduce(
    (max, poke) => {
      const dimensionVal = extractNumber(poke[dimension].maximum)
      return max > dimensionVal ? max : dimensionVal
    },
    extractNumber(pokemon[0][dimension].maximum)
  )

const getHappinessNumber = (pokeTypes, env) => (
  env.happy.filter(type => pokeTypes.includes(type)).length * 2 +
  env.content.filter(type => pokeTypes.includes(type)).length -
  env.unhappy.filter(type => pokeTypes.includes(type)).length * 5
)

// const calcPokemonHappiness = (pokemon, envs) => envs.reduce(
//   (tally, env) => tally + getHappinessNumber(pokemon, env), 0
// ) / pokemon.types.length

// const sortPokemonByEnvironments = (pokemon, environments) =>
//   [...pokemon].sort((a, b) => calcPokemonHappiness(b, environments) - calcPokemonHappiness(a, environments))

/**
 * new code
 */

const pokeChooser = (pokemon, param) => {
  const { scoredPoke, globals } = getScores([...pokemon], param)

  console.log(scoredPoke, globals)

  sortPokemon(scoredPoke, globals, param.homeSize)
}

const getScore = (types, json) =>
  json.reduce(
    (tally, env) => tally + getHappinessNumber(types, env), 0
  ) / types.length

const getScores = (pokemon, param) =>
  pokemon.reduce((result, poke) => {
    let scoredPoke = {...poke}
    scoredPoke.envScore = getScore(poke.types, param.env)
    scoredPoke.featureScore = getScore(poke.types, param.features)

    if (result.globals.maxEnv < scoredPoke.envScore) result.globals.maxEnv = scoredPoke.envScore
    if (result.globals.maxFeatures < scoredPoke.featureScore) result.globals.maxFeatures = scoredPoke.featureScore

    result.scoredPoke.push(scoredPoke)
    result.globals.weights.push(extractNumber(poke.weight.maximum))

    return result
  }, {
    scoredPoke: [],
    globals: {
      maxEnv: 0,
      maxFeatures: 0,
      weights: [],
    },
  })

const sortPokemon = (pokemon, globals, homeSize) => {
  const idealSize = Math.max(globals.weights) * homeSize / 18
  pokemon.sort((a, b) => {

  })
}

// const getHappinessScore = (pokemon, sortObj) => {
//   const { ds, ads } = getSizeDeviation(pokemon, sortObj)
//   getWeightedEnvHappiness(pokemon, 'hi')
// }

export default pokeChooser

export {
  averageMaxDimension,
  minMaxDimension,
  maxMaxDimension,
  standardDeviationMaxDimension,
}

/*
param
  [env]
  idealSize
  [features]

calcObj
  maxEnv
  maxFeatures
  averageSizeDeviation
  avgWeight

tempPokeObj
  [poke]
    id
    envScore
    featuresScore
 */
