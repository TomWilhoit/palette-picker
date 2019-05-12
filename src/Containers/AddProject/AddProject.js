import React, { Component } from "react"

export class AddProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className='add-project'>
        <input className='new-project-input'
               name='title'
               placeholder='Add New Project'
               defaultValue={this.state.title}
               onKeyUp={this.handleChange}
        />
        <button className='add-project-btn'>
          <i class="fas fa-plus"></i>
        </button>
      </div>
    )
  }
}