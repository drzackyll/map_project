import React from 'react'

function Loading(props) {
  function randomLoadingGif() {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const loadingIds = [
      '//giphy.com/embed/l2YWrofY3K6Vr4bbW',
      '//giphy.com/embed/l2YWlSLR1oYq9J4t2',
      '//giphy.com/embed/l2YWAOJso1n136fM4',
      '//giphy.com/embed/l2YWq3LRqS5th3r8c',
      '//giphy.com/embed/l2YWgjGt4Ea8KdUpq',
    ]

    return loadingIds[getRandomIntInclusive(0,loadingIds.length-1)]
  }

  return (
    <div>
      <h1>Loading...</h1>
      <iframe src={randomLoadingGif()} width="100%" height="600" frameBorder="0"/>
    </div>
  )
}

export default Loading
