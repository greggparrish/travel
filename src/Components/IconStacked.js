import React from 'react';

const StackedIcon = (props) => (
  <span className="fa-stack fa-4x">
    <i className={"fa fa-stack-2x " + props.stackIcon}></i>
    <i className={"fa fa-stack-1x fa-inverse " + props.icon}></i>
  </span>
);
export default StackedIcon;
