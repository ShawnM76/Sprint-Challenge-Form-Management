import React from 'react';

class Cards extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className='userCard'>
        <h3>{this.props.name}</h3>
        <p>{this.props.course}</p>
        <p>{this.props.technique}</p>
      </div>
    );
  }
}

export default Cards;
