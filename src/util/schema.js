export const typeDefs = `
type: Pokemon {
  id
  number
  weight {
    minimum
    maximum
  }
  height {
    minimum
    maximum
  }
  name
  types
  classification
  resistant
  weaknesses
  attacks {
    fast {
      name
      type
      damage
    }
    special {
      name
      type
      damage
    }
  }
  evolutions {
    id
    number
    name
    weight {
      minimum
      maximum
    }
    attacks {
      fast {
        name
        type
        damage
      }
    }
  }
}

type: Query {
  pokemon: [Pokemon]
`
