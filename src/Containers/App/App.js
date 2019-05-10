import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { addProjects } from '../../Actions';
import { addPalettes } from '../../Actions'
import { fetchData } from '../../Utils/API'
import PropTypes from "prop-types"

export class App extends Component {
  constructor() {
    super()
    this.state = {
      error: ''
    }
  }

  componentDidMount( ){
    this.fetchProjectsData()
    this.fetchPalettesData()
  }

  fetchProjectsData = async () => {
    const url = "http://localhost:3000/api/v1/projects"
    try {
      const response = await fetchData(url)
      await this.props.addProjects(response)
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  fetchPalettesData = async () => {
    const url = "http://localhost:3000/api/v1/palettes"
    try {
      const result = await fetchData(url)
      await this.props.addPalettes(result)
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  render() {
      return (
        <div className="App">
          <header>
            <h1>
              Tom and Mason are Really Good at Programming
            </h1>
            {this.state.error && this.state.error}
          </header>
        </div>
      )
    }
  }

App.propTypes = {
  locations: PropTypes.array,
  palettes: PropTypes.array
}

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes
})

export const mapDispatchToProps = dispatch => ({
  addProjects: projects => dispatch(addProjects(projects)),
  addPalettes: palettes => dispatch(addPalettes(palettes))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)