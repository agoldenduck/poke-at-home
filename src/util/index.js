// Fisher-Yates shuffle
const shuffle = array => {
  let result = new Array(...array)
  let n = result.length
  let t
  let i

  while (n) {
    i = Math.floor(Math.random() * n--)
    t = result[n]
    result[n] = result[i]
    result[i] = t
  }
  return result
}

// Merge sort with comparator function
const sort = (array, compFunc) => {
  if (array.length === 1) {
    // return once we hit an array with a single item
    return array
  }

  const middle = Math.floor(array.length / 2) // get the middle item of the array rounded down
  const left = array.slice(0, middle) // items on the left side
  const right = array.slice(middle) // items on the right side

  return merge(
    sort(left, compFunc),
    sort(right, compFunc),
    compFunc,
  )
}

// compare the arrays item by item and return the concatenated result
const merge = (left, right, compFunc) => {
  let result = []
  let indexLeft = 0
  let indexRight = 0
  let comparator = x => x
  if (compFunc && typeof compFunc === 'function') {
    comparator = compFunc
  }

  while (indexLeft < left.length && indexRight < right.length) {
    if (comparator(left[indexLeft]) < comparator(right[indexRight])) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
}

export {
  shuffle,
  sort,
}
