import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import styled from 'styled-components';
import { easy } from './data/data';

const ComandsContainer = styled.div`

width:30%;
margin: auto;
display:flex;
padding: 2%;
flex-direction:column;
`

const StartContainer = styled.div`
width:100%;
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
`

const GameContainer = styled.div`
width:60%;
height: 65vh;
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(4, 1fr);

`
const H1 = styled.h1`
font-family: "Bangers";
color: #fafafa;
letter-spacing: 0.12rem;
text-shadow: 2px 2px #000000;
`

const H3 = styled.h3`
font-family: "Bangers";
color: #fafafa;
letter-spacing: 0.12rem;
text-shadow: 2px 2px #000000;
`


const Button = styled.button`
background-color: lightcyan;
width: 6rem;
font-family: "Bangers";
height: 2rem;
color: black;
border: none;
&:hover{
  color:white;
  background-color: red;
}
`

function App() {
  const [items, setItems] = useState([])  //crea un estado de array vacio para la data
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  let [score, setScore] = useState(null) // records de intentos

  let levelSelected = [...easy, ...easy]



  const shuffleCards = () => {
    const shuffle = levelSelected //[...dataImg, ...dataImg]  //crea un array duplicando las imagenes en pares
      .sort(() => Math.random() - 0.5)   // mezcla la data 
      .map((card) => ({ ...card, id: Math.random() })) // le da un Id aleatorio a cada objeto del array
    setItems(shuffle)  // carga la data mezclada al array vacio
    setTurns(0)
    if (turns < score) {
      setScore(turns)
    }   //setea los turnos de juego desde 0

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



  return (
    <div className="App">
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
      <ComandsContainer>
        <H1>Memory Game</H1>
        <StartContainer>
          <H3>Intentos: {turns}</H3>
          <H3>Puntuacion Maxima {score}</H3>
          <Button onClick={shuffleCards}>Mezclar</Button>
        </StartContainer>
      </ComandsContainer>



    </div>
  );
}

export default App;
