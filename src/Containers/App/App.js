import React, { Component } from 'react';
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { addProjects } from '../../Actions';
import { addPalettes } from '../../Actions'
import { fetchData } from '../../Utils/API'
import PropTypes from "prop-types"
import { Loading } from '../../Components/Loading/Loading'
import { Header } from '../../Components/Header/Header'
import { Body } from '../../Components/Body/Body'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      isLoading: false
    }
  }

  componentDidMount() {
    this.fetchProjectsData()
    this.fetchPalettesData()
  }

  fetchProjectsData = async () => {
    this.toggleLoading()
    const url = "http://localhost:3000/api/v1/projects"
    try {
      const projects = await fetchData(url)
      this.updateProjects(projects)
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  fetchPalettesData = async () => {
    const url = "http://localhost:3000/api/v1/palettes"
    try {
      const palettes = await fetchData(url)
      this.updatePalettes(palettes)
    } catch(error) {
      this.setState({ error: error.message })
    }
    this.toggleLoading()
  }

  updateProjects = (projects) => {
    this.props.addProjects(projects)
  }

  updatePalettes = (palettes) => {
    this.props.addPalettes(palettes)
  }

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  render() {
      return (
        <div className="App">
          <Header />
            {this.state.error && this.state.error}
            {this.state.isLoading && <Loading />}
          <Body />
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