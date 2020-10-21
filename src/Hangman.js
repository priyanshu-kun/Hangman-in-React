import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words"
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord(), hide: false };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
      hide: true
    })
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    console.log(this.state.answer)
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    let gameOver = this.state.nWrong < this.props.maxWrong;
    let gameWin = this.guessedWord().join("") === this.state.answer;

    /* after win the game when user click the reset button so that hide state becomes true then game win variable become false it will show all buttons again
      */
    this.state.hide ? !gameWin : gameWin;

    /* tack is user game win or not if user win the game so the gameWin variable becomes true and display none property will fire else nothing is happen (for show or hide buttons pad) */
    let styleObj = {
      display: gameWin ? "none" : ""
    }

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <hr />
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong}th wrong guess`} />
        <br />
        <small>Number of wrong guess: {this.state.nWrong}</small>
        <p className='Hangman-word'>{gameOver ? this.guessedWord() : this.state.answer}</p>
        <p style={{ ...styleObj }} className='Hangman-btns'>{
          gameOver ? this.generateButtons() : `You loose: ( ${this.state.answer} )`
        }</p>
        {gameWin && <p style={{ color: "#fff" }}>You Win!</p>}
        <button className="reset" onClick={this.resetGame} >Restart</button>
      </div>
    );
  }
}

export default Hangman;
