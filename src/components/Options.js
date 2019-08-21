import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    { props.options.length === 0 && <p>There are not options bruh!</p>}
    { 
      props.options.map((opt) => (
        <Option 
          key={opt} 
          option={opt}
          handleDeleteOption={props.handleDeleteOption}
        /> 
      ))
    }
  </div>
);

export default Options;