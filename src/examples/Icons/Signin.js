import PropTypes from "prop-types";

function UserIcon({ color, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="bevel"
    >
      <title>User</title>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

// Setting default values for the props of UserIcon
UserIcon.defaultProps = {
  size: 24,
  color: "currentColor",
};

// Typechecking props for the UserIcon
UserIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default UserIcon;
