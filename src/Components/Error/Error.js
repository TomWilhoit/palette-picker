import React from "react";
import PropTypes from "prop-types";


export const Error = props => <h2 className="error-display">{props.message}</h2>

Error.propTypes = {
  message: PropTypes.func
};