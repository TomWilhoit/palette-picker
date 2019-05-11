import React, { Component } from 'react';
import { Project } from '../Project/Project'

export class Projects extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  // addProject = () => {}

  // function to gather project names
  // thinking we make Project component for each one
  // may make delete easier

  render() {
    return(
      <div className='projects'>
        <div className='add-project'>Add Project</div>
        <Project />
        <Project />
      </div>
    )
  }
}