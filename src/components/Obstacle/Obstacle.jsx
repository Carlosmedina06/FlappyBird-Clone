import Matter from 'matter-js'
import { Image } from 'react-native'

import pipeBottom from '../../assets/pipe-green.png'
import pipeTop from '../../assets/pipe-red.png'

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  const image = props.color === 'green' ? pipeBottom : pipeTop

  return (
    <Image
      resizeMode="stretch"
      source={image}
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        height: heightBody,
        width: widthBody + 50,
      }}
    />
  )
}

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label,
    isStatic: true,
  })

  Matter.World.add(world, initialObstacle)

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  }
}
