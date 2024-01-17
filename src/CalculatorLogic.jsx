import React from 'react';
import { useState } from 'react';
// handle the logic of the calculator

const MyComponent = () => {
  calculate = () => {
    try {
      const result = eval(this.state.display);
      this.setState({display: result});
    } catch (e) {
      this.setState({display: 'error'});
    }
  };
  
};

export default MyComponent;
