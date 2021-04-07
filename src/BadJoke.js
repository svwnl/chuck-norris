import React from 'react';

const BadJoke = ({badJokes}) => {

  return (
   badJokes.map((joke, index) => <div className={"bad-joke"} key={index}>
     <i className={"fa fa-2x fa-skull"}> </i><br />
     <small>{joke}</small>
      </div>
    ));
}

export default BadJoke;
