render json: {
  user: {
    username: username,
    days_survived: x,
    humans_infected: y
  },
  scores: {
    human: [
      {
        username: username,
        days_survived: x
      },
      ...
    ],
    zombie: [
      {
        username: username,
        humans_infected: y
      },
      ...
    ]
  }
}
