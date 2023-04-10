import { Image } from 'react-native'
import Matter from 'matter-js'

import flappybird from '../../assets/flappybird.png'

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'bird',
  })

  Matter.World.add(world, initialBird)

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird color={color} pos={pos} size={size} />,
  }
}

export const Bird = ({ body }) => {
  const widthBody = body.bounds.max.x - body.bounds.min.x
  const heightBody = body.bounds.max.y - body.bounds.min.y
  const xBody = body.position.x - widthBody / 2
  const yBody = body.position.y - heightBody / 2

  return (
    <Image
      source={flappybird}
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody + 20,
        height: heightBody,
      }}
    />
  )
}
