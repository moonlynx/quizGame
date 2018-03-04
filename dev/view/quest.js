import React from 'React';

export default class Quest extends React.Component {
  render() {
    return <div className='gameQuest'>{this.props.quest}</div>;
  }
}