import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import styled from 'styled-components';
import { dataImg } from './data/data';


const GameContainer = styled.div`
width:50%;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 5px;
grid-row-gap: 5px;
`
function App() {
  const [items, setItems] = useState([])  //crea un estado de array vacio para la data
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [score, setScore] = useState(0) // records de intentos



  const shuffleCards = () => {
    const shuffle = [...dataImg, ...dataImg]  //crea un array duplicando las imagenes en pares
      .sort(() => Math.random() - 0.5)   // mezcla la data 
      .map((card) => ({ ...card, id: Math.random() })) // le da un Id aleatorio a cada objeto del array
    setItems(shuffle)  // carga la data mezclada al array vacio
    setTurns(0)   //setea los turnos de juego desde 0
  }


  const handleClick = (item) => {   //funcion que se pasa como props al componente
    choiceOne ? setChoiceTwo(item) : setChoiceOne(item)
  }

  //comparar las dos cartas
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.img === choiceTwo.img) {
        setItems(prevItems => {
          return prevItems.map(card => {
            if (card.img === choiceTwo.img) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {

        setTimeout(() => resetTurn(), 1000) //da vuelta las cartas si no hay coincidencia en 1 segundo
      }
    }
  }, [choiceOne, choiceTwo])

  //resetear las cartas e incrementar el contador
  const resetTurn = () => {

    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevturns => prevturns + 1)

  }

  const HighScore = () => {
    setScore(turns)
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div>{turns}</div>
      <div>{score}</div>
      <button onClick={shuffleCards}>Nuevo Juego</button>
      <GameContainer>
        {items.map((item, index) =>
          <Card
            key={index}
            item={item}
            id={item.name}
            handleClick={handleClick}
            flipped={item === choiceOne || item === choiceTwo || item.matched} //Rota la carta para ver la imagen
          />)}
      </GameContainer>


    </div>
  );
}

export default App;
