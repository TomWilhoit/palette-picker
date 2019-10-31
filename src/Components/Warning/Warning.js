import React from "react";
import PropTypes from "prop-types";

export const Warning = props => <h2 className="warning">{props.message}</h2>;

Warning.propTypes = {
  message: PropTypes.string,
};