import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Dolor({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      stroke={colors[color] ? colors[color].main : colors.dark.main}
      strokeWidth="3.5"
      strokeLinecap="none"
      strokeLinejoin="none"
    >
      <title>dolor</title>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

// Setting default values for the props of Dolor
Dolor.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Dolor
Dolor.propTypes = {
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

export default Dolor;
