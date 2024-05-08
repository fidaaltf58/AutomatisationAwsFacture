/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios"; // Import Axios for making HTTP requests


// @mui material components
import Switch from "@mui/material/Switch";

import { useHistory } from "react-router-dom";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);



  const handleSignIn = async () => {
    try {
      // Make a POST request to the login API
      const response = await axios.post('http://localhost:8000/login', {
        access_key: accessKey,
        secret_key: secretKey
      });

      // If login is successful, redirect to dashboard
      if (response.status === 200) {
        setLoggedIn(true);
      }
    } catch (error) {
      // Handle errors here, e.g., show error message to user
      console.error("Error occurred during login:", error);
    }
  };

  // If loggedIn is true, navigate to "/dashboard"
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <CoverLayout 
      title="Welcome back"
      description="Enter your Acces Key and Secret Acces Key  to sign in to your aws Account"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
            Acces Key
            </SoftTypography>
          </SoftBox>
          <SoftInput type="Acces Key" placeholder="Acces Key" />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Secret Acces Key
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="secret Acces Key" />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
            sign in
          </SoftButton>
        </SoftBox>
       
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
