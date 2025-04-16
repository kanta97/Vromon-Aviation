import React, { Component } from 'react';

import JSONPretty from 'react-json-prettify';


class hotelPreview extends Component {
  constructor(props){
    super(props)
    //console.log(this.props.modal_data)
  }


  render() {
    return (
      <div style={{ minHeight : '300px' }}>
        
        <JSONPretty json={this.props.modal_data} padding={2} />
          
        
      </div>
    );
  }
}

export default hotelPreview;
