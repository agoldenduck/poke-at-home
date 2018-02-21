import { sort } from './index'

const extractNumber = numString => Number(numString.split(/[km ]/i)[0])

const getStandardDeviation = array => {
  const average = array.reduce((tally, num) => tally + num) / array.length
  return Math.sqrt(
    array.map(num => Math.pow(num - average, 2)).reduce((tally, num) => tally + num) / array.length
  )
}

const pokeChooser = (pokemon, param) => {
  const { scoredPoke, maxs, weightList } = getScores([...pokemon], param)
  const weights = getWeightHelpers(weightList, Math.round(param.homeSize))

  return sortPokemon(scoredPoke, maxs, weights)
}

const getHappinessNumber = (pokeTypes, param) => (
  param.happy.filter(type => pokeTypes.includes(type)).length * 2 +
  param.content.filter(type => pokeTypes.includes(type)).length -
  param.unhappy.filter(type => pokeTypes.includes(type)).length * 5
)

const getScore = (types, param) =>
  param.reduce(
    (tally, env) => tally + getHappinessNumber(types, env), 0
  ) / types.length

const getScores = (pokemon, param) =>
  pokemon.reduce((result, poke) => {
    let scoredPoke = {
      ...poke,
      weight: typeof poke.weight === 'object' ? extractNumber(poke.weight.maximum) : poke.weight,
      envScore: getScore(poke.types, param.env),
      featureScore: getScore(poke.types, param.features),
    }

    if (result.maxs.maxEnv < scoredPoke.envScore) result.maxs.maxEnv = scoredPoke.envScore
    if (result.maxs.maxFeatures < scoredPoke.featureScore) result.maxs.maxFeatures = scoredPoke.featureScore

    result.scoredPoke.push(scoredPoke)
    result.weightList.push(scoredPoke.weight)

    return result
  }, {
    scoredPoke: [],
    maxs: {
      maxEnv: 0,
      maxFeatures: 0,
    },
    weightList: [],
  })

const getWeightSteps = weights =>
  weights
    .sort((a, b) => a - b)
    .reduce(
      (weightGroups, weight) => {
        if (weightGroups[weightGroups.length - 1].length < Math.ceil(weights.length / 19)) {
          weightGroups[weightGroups.length - 1].push(weight)
        } else {
          weightGroups.push([weight])
        }
        return weightGroups
      }, [[]]
    )
    .map(weightGroup => Math.max(...weightGroup))

const getWeightedDeviationsFromIdeal = (num, ideal, sd) => {
  const diff = ideal - num
  return diff < 0 ? Math.min(-diff * 3, Math.pow(diff, 2)) / sd : diff / sd
}

const getWeightHelpers = (weights, roundedHomeSize) => {
  const steps = getWeightSteps(weights)
  const sd = getStandardDeviation(weights)

  const averageDeviationFromIdealWeight = weights
    .reduce(
      (tally, weight) =>
        tally + getWeightedDeviationsFromIdeal(weight, steps[roundedHomeSize], sd),
      0
    ) / weights.length

  return {
    sd,
    ideal: steps[roundedHomeSize],
    ads: averageDeviationFromIdealWeight,
  }
}

const calculateETV = (pokemon, maxs, weights) => {
  const e = pokemon.envScore
  const me = maxs.maxEnv || 1
  const f = pokemon.featureScore
  const mf = maxs.maxFeatures || 1
  const ds = getWeightedDeviationsFromIdeal(pokemon.weight, weights.ideal, weights.sd)
  const ads = weights.ads

  return (Math.abs(e) / me * ds) + ((1 - e / me) * ads) + (Math.abs(f) / mf * ds) + ((1 - f / mf) * ads)
}

const sortPokemon = (pokemon, maxs, weights) => {
  const sortablePoke = pokemon.map(poke =>
    ({ ...poke, etv: calculateETV(poke, maxs, weights) })
  )

  return sort(sortablePoke, a => a.etv)
}

export default pokeChooser

export {
  extractNumber,
  getStandardDeviation,
}
