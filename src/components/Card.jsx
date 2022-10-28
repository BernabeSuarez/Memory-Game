import styled from "styled-components";
import React from "react";
import "../../src/App.css";

const CardContainer = styled.div`
  position: relative;
  width: 75%;
  margin: 1% auto 2% auto;

  & img {
    max-width: 100%;
  }
`;

const Card = ({ item, handleClick, flipped }) => {
  return (
    <CardContainer>
      <div className={flipped ? "flipped imgContainer" : "imgContainer"}>
        <img className="front" src={item.img} alt={item.name} />
        <img
          className="back"
          src={item.background}
          alt=" Card Back"
          onClick={() => handleClick(item)}
        />
      </div>
    </CardContainer>
  );
};

export default Card;
