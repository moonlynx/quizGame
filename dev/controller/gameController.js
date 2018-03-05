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
      gameStage: "NewGame",
      questNumber: 0,
      wins: 0,
      losts: 0,
      motiv: ''
    }

    this.verifyAnswer = this.verifyAnswer.bind(this);
    this.setGameStage = this.setGameStage.bind(this);
  }

  setGameStage(stage) {
    this.setState({
      gameStage: stage
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

    if (this.state.questNumber == Questions.length - 1) {
      this.setGameStage("EndGame");
    } else {
      this.setState({questNumber: this.state.questNumber + 1});
    }
  }

  render() {

    let gameStagesTemplates = {
            "NewGame":  <button 
                          onClick = {() => {this.setGameStage("Game")}}
                          className = "newGameButton">
                          Новая игра
                        </button>,

            "Game":[
                  <Score wins={this.state.wins} losts={this.state.losts} key="Score" />,
                  <Motiv mString={this.state.motiv} key="Motiv" />,
                  <Quest quest={Questions[this.state.questNumber].question} key="Quest" />,
                  <Answers answers={Questions[this.state.questNumber].answers} clickHandler={this.verifyAnswer} key="Answers" />
                ],
                
            "EndGame": [
                  <div className = "EndGame__wins" key="wins">Правильных ответов:<span>{this.state.wins}</span></div>,
                  <div className = "EndGame__losts" key="losts">Неправильных ответов:<span>{this.state.losts}</span></div>
                ]
    }

    return (
      <div className='gameBoard'>
        {gameStagesTemplates[this.state.gameStage]}
      </div>
    )
  }
}