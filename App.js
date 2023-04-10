import { useState, useEffect } from 'react'
import { StatusBar, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native'
import { GameEngine } from 'react-native-game-engine'

import entities from './src/entities'
import Physics from './src/physics'
import background from './src/assets/background.png'
import gameOver from './src/assets/gameover.png'

export default function App() {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)

  useEffect(() => {
    setRunning(false)
  }, [])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
        <Text
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
            zIndex: 1,
            position: 'absolute',
            top: 50,
            left: '40%',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
          }}
        >
          {currentPoints}
        </Text>
        <GameEngine
          ref={(ref) => {
            setGameEngine(ref)
          }}
          entities={entities()}
          running={running}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          systems={[Physics]}
          onEvent={(e) => {
            switch (e.type) {
              case 'game_over':
                setRunning(false)
                gameEngine.stop()
                break
              case 'score':
                setCurrentPoints(currentPoints + 1)
                break
            }
          }}
        >
          <StatusBar hidden={true} />
        </GameEngine>

        {!running ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
              onPress={() => {
                setCurrentPoints(0)
                setRunning(true)
                gameEngine.swap(entities())
              }}
            >
              <Image source={gameOver} />
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>RESTART GAME</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  )
}
