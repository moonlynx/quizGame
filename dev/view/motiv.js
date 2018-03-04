import React from 'React';

export default class Motiv extends React.Component {
  render() {
    return (<div className='gameMotiv'>
              <span>{this.props.mString}</span>
            </div>);
  }
}