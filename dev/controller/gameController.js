import React from 'React';
import Score from '../view/score';
import Motiv from '../view/motiv';
import Quest from '../view/quest';
import Answers from '../view/answers';
import Questions from '../model/questions';
import MotivStrings from '../model/motivStrings';

export default class GameBoard extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      newGame: true,
      endGame: false,
      questNumber: 0,
      wins: 0,
      losts: 0,
      motiv: ''
    }
    
    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.newGameClickHandler = this.newGameClickHandler.bind(this);
  }

  newGameClickHandler() {
    this.setState({
      newGame: false
    });
  }

  getMotivString(isRightAnswer) {
    let result = '';
    
    if (isRightAnswer) {
      let index = Math.floor(Math.random() * MotivStrings.good.length);
      result = MotivStrings.good[index];
    
    } else {
      let index = Math.floor(Math.random() * MotivStrings.bad.length);
      result = MotivStrings.bad[index];
    }

    return result;
  }

  verifyAnswer(answer) {
        
    if (answer == Questions[this.state.questNumber].rightAnswer) {
      this.setState({
        wins: this.state.wins + 1,
        motiv: this.getMotivString(true)
      });
    } else {
      this.setState({
        losts: this.state.losts + 1,
        motiv: this.getMotivString(false)
      });
    }

    this.setState({questNumber: this.state.questNumber + 1});
  }

  render() {
    let menu;

    if (this.state.newGame) {
      menu =  <button onClick={this.newGameClickHandler}>New Game</button>;

    } else {
      menu =  [<Score wins={this.state.wins} losts={this.state.losts} key="Score" />,
              <Motiv mString={this.state.motiv} key="Motiv" />,
              <Quest quest={Questions[this.state.questNumber].question} key="Quest" />,
              <Answers answers={Questions[this.state.questNumber].answers} onClick={this.verifyAnswer} key="Answers" />];
    }

    return (
      <div className='gameBoard'>
        {menu}
      </div>
    )
  }
}