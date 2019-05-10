import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { addProjects } from './Actions';
import { addPalettes } from './Actions'
import { fetchData } from './Utils/API'
import PropTypes from "prop-types"
import './App.scss';

export class App extends Component {
  
  componentDidMount( ){
    this.fetchProjectsData();
    this.fetchPalettesData()
  }

  fetchProjectsData = async () => {
    const url = "http://localhost:3000/api/v1/projects"
    const response = await fetchData(url)
    await this.props.addProjects(response)
  }

  fetchPalettesData = async () => {
    const url = "http://localhost:3000/api/v1/palettes"
    const result = await fetchData(url)
    await this.props.addPalettes(result)
  }

  testCI = () => {
    console.log('this tests the TravisCI changes')
  }

  render() {
      return (
        <div className="App">
          <header>Tom and Mason are Really Good at Programming</header>
        </div>
      );
    }
  }

  App.propTypes = {
    locations: PropTypes.array,
    palettes: PropTypes.array
  };

export const mapStateToProps = state => ({
  projects: state.projects,
  palettes: state.palettes
});

export const mapDispatchToProps = dispatch => ({
  addProjects: projects => dispatch(addProjects(projects)),
  addPalettes: palettes => dispatch(addPalettes(palettes))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

