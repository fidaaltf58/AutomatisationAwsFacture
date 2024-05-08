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

// @mui material components
import Grid from "@mui/material/Grid";



// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <SoftBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Company
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="https://www.vermeg.com/" variant="body2" color="secondary">
                About Us
              </SoftTypography>
              </SoftBox>
              <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography variant="body2" color="secondary">
            Copyright &copy; 2024 Vermeg-Fidaa letaief.
          </SoftTypography>
          </SoftBox>
           
            </SoftBox>
            </Grid>
      
      </Grid>
    </SoftBox>
  );
}

export default Footer;
