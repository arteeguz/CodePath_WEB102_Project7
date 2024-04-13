import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import crewImage from '../Photos/crew.png';  // Importing the image


const Card = (props) => {
  const [count, setCount] = useState(0);
  const updateCount = () => setCount(count + 1);

  return (
      <div className="Card" style={{ borderColor: props.color }}>
          <Link to={'edit/' + props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <Link to={'/crewmate/' + props.id}>  {/* Link to the crewmate details page */}
            <img src={crewImage} alt="Crewmate" className="crewImage"/>  {/* Displaying the crew image */}
          </Link>
          <h2 className="title">{props.name}</h2>
          <h3 className="author">Speed: {props.speed}</h3>
          <p className="description">Color: {props.color}</p>
          <button className="betButton" onClick={updateCount}>👍 Like Count: {count}</button>
      </div>
  );
};

export default Card;