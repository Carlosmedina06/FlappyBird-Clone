import Matter from 'matter-js'
import { Dimensions } from 'react-native'

import Bird from '../components/Bird/Bird'
import Floor from '../components/Floor/Floor'
import Obstacle from '../components/Obstacle/Obstacle'
import { getPipeSizePosPair } from '../utils/random'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const restar = () => {
  let engine = Matter.Engine.create({ enableSleeping: false })

  let world = engine.world

  world.gravity.y = 0.5

  const pipeSizePosA = getPipeSizePosPair(-50)
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)

  return {
    physics: { engine, world },

    Bird: Bird(world, 'red', { x: 50, y: 300 }, { height: 40, width: 40 }),

    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBottom1: Obstacle(
      world,
      'ObstacleBottom1',
      'green',
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
    ),

    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'red',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBottom2: Obstacle(
      world,
      'ObstacleBottom2',
      'green',
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
    ),

    Floor: Floor(
      world,
      'green',
      { x: windowWidth / 2, y: windowHeight },
      { height: 100, width: windowWidth },
    ),
  }
}

export default restar
