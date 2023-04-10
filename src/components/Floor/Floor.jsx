import Matter from 'matter-js'
import { Image, View } from 'react-native'

import floor from '../../assets/floor.png'

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

  const xBody = props.body.position.x - widthBody / 2
  const yBody = props.body.position.y - heightBody / 2

  const color = props.color

  return (
    <Image
      source={floor}
      style={{
        backgroundColor: color,
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody + 200,
        height: heightBody + 100,
      }}
    />
  )
}

export default (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Floor',
    isStatic: true,
  })

  Matter.World.add(world, initialFloor)

  return {
    body: initialFloor,
    color,
    pos,
    renderer: <Floor />,
  }
}
