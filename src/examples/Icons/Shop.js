import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Dashboard({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      strokeWidth="0.5"
     
    >
      <title>dashboard</title>
      
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

// Setting default values for the props of Dashboard
Dashboard.defaultProps = {
  color: "primary",
  size: "16px",
};

// Typechecking props for the Dashboard
Dashboard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Dashboard;

