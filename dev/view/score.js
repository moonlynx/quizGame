import React from 'React';

export default class Score extends React.Component {
  render() {
    return  <div className='gameScore'>
              <span className="gameScore__winScore">{this.props.wins}</span>
              :
              <span className="gameScore__lostScore">{this.props.losts}</span>
            </div>
  }
}