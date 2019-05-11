import React, { Component } from 'react';

export class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    console.log(this.props)
    return(
      <div className='project'>
        <h3>{this.props.name}</h3>
      </div>
    )
  }
}