import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Fonction simulée pour vérifier l'authentification
const isAuthenticated = () => {
  // Vérifiez si le token d'authentification est présent dans localStorage
  const token = localStorage.getItem('authToken');
  console.log("isAuthenticated check: ", token); // Debug log
  return token !== null;
};

// Composant de route privée
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/authentication/sign-in" />;
};

// Ajouter les propTypes pour la validation des props
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
