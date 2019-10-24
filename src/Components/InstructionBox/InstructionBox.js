import React from "react";
import PropTypes from "prop-types";


export const InstructionBox = props => {
  return (
    <div className="instruction-box">
      {props.message}
    </div>
  )
}

InstructionBox.propTypes = {
  message: PropTypes.string
};