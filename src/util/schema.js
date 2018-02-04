export const typeDefs = `
type: Pokemon {
  id
  number
  weight {
    minimum
    maximum
  }
  name
  attacks {
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
