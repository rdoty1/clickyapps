import React, { Component } from 'react';

import './app.css';
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper";
import birdies from "./birdies.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    birdies,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };
  clickPicture = id => {
    // Arrange the pictures in a random manner
    const shuffledArray = this.shuffleArray(birdies);
    this.setState({birdies: shuffledArray});
    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray, end of if block
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect!! Game Over ☹️ Click an image to start again!", shakeit: "true"});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Streaking",
        shakeit: "false"
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit is set to true
  }
  shuffleArray = (picturesArray) => {
      for (let i = picturesArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
      }
      return picturesArray;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Welcome to my bird clicking game</h1>
        </header>
        <h3 className="App-intro">
          <strong>Click birds to earn points, but don't click on any, more than once, or you LOOSE!!</strong> 
          <p className = "score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper
        shakeWrapper = {this.state.shakeit}
        pictures=
          {this.state.birdies.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id} // to get rid of unique key prop warning
              
              image={picture.image}
            />
          ))}
        />
        <footer className="footer">
      <div className="container">
        <span className="text-muted">&copy;Ryan Doty - Clicky App.</span>
      </div>
    </footer> 
      </div>
    );
  }
}
export default App;