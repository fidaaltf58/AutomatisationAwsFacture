import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Pencil({ color, size }) {
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>pencil</title>
      <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
      <line x1="3" y1="22" x2="21" y2="22"></line>
    </svg>
  );
}

// Setting default values for the props of Pencil
Pencil.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Pencil
Pencil.propTypes = {
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

export default Pencil;
