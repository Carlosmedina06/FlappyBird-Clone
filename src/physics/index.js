import Matter from 'matter-js'
import { Dimensions } from 'react-native'

import { getPipeSizePosPair } from '../utils/random'

const windowWidth = Dimensions.get('window').width

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine

  touches
    .filter((t) => t.type === 'press')
    .forEach(() => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -7,
      })
    })
  Matter.Engine.update(engine, time.delta)

  for (let i = 1; i <= 2; i++) {
    if (entities[`Floor`].body.bounds.max.x <= windowWidth * 0.9) {
      Matter.Body.setPosition(entities[`Floor`].body, { x: windowWidth / 2, y: 930 })
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${i}`].point) {
      entities[`ObstacleTop${i}`].point = true
      dispatch({ type: 'score' })
    }

    if (entities[`ObstacleTop${i}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9)

      Matter.Body.setPosition(entities[`ObstacleTop${i}`].body, pipeSizePos.pipeTop.pos)
      Matter.Body.setPosition(entities[`ObstacleBottom${i}`].body, pipeSizePos.pipeBottom.pos)
      entities[`ObstacleTop${i}`].point = false
    }

    Matter.Body.translate(entities[`ObstacleTop${i}`].body, { x: -3, y: 0 })
    Matter.Body.translate(entities[`ObstacleBottom${i}`].body, { x: -3, y: 0 })
    Matter.Body.translate(entities[`Floor`].body, { x: -1.5, y: 0 })
  }

  Matter.Events.on(engine, 'collisionStart', () => {
    dispatch({ type: 'game_over' })
  })

  return entities
}

export default Physics
