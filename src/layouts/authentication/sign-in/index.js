import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import logo from "./VER.png";

function SignIn() {
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        access_key: accessKey,
        secret_key: secretKey
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token); // Store token in localStorage
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your Access Key and Secret Access Key to sign in to your AWS Account"
      image={curved9}
      logo={logo} 
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Access Key
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Access Key"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Secret Access Key
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Secret Access Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
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
            Sign In
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
