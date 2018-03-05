import React from 'React';

export default class Answers extends React.Component {
  render() {
    let clickHandler = this.props.clickHandler;

    let questAnswers = this.props.answers.map((answer, i) => {
      return (<div key={i}>
                <span onClick={function() {clickHandler(answer)}} className='gameAnswers__answer'>{answer}</span>
              </div>);
    });

    return  (<div className='gameAnswers'>
             {questAnswers}
            </div>);
  }
}