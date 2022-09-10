import styled from "styled-components";
import React from "react";
import "../../src/App.css";

const CardContainer = styled.div`
  position: relative;
  width: 100px;
  margin: auto;
  border-radius: 20px;

  & img {
    max-width: 100%;
  }
`;

const Card = ({ item, id, handleClick, flipped }) => {
  return (
    <CardContainer onClick={() => handleClick(item)}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={item.img} alt={item.name} />
        <img className="back" src="Img/Card Back.jpg" alt=" Card Back" />
      </div>
    </CardContainer>
  );
};

export default Card;
