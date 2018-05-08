import React, { Component } from 'react';
import Header from './Header';
import base from '../base';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      locationNames: []
    }
  }

  componentDidMount() {
    base.fetch(`/locations`, { context: this }).then( response => {
      console.log('Response: ', response);
      this.setupLocations(response);
    });
    // console.log(this.props);
    // this.ref = base.syncState()
  }

  setupLocations(locations) {
    const locationNames = Object.keys(locations);

    this.setState({
      locationNames
    });
  }

  render() {

    const locationMap = this.state.locationNames.map( (item, index) => {
      return <div>{item}</div>
    });

    return (
      <div className='mainContainer'>
        <Header />
        {locationMap}
      </div>
    );
  }
}

export default App;
