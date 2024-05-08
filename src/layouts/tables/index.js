import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import React, { useState, useEffect } from 'react';
import SoftButton from "components/SoftButton";
import SoftSelection from "components/SoftSelection";
import SuiSelect from "components/SuiSelect";
import "react-datepicker/dist/react-datepicker.css";
import { exportToExcel } from "./export";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";


function Tables() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [granularity, setGranularity] = useState('MONTHLY');
  const [metrics, setMetrics] = useState('BlendedCost');
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGranularityChange = (event) => {
    setGranularity(event.target.value);
  };

  const handleMetricsChange = (event) => {
    setMetrics(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const fetchBillingData = async () => {
    console.log("Fetching data with startDate:", startDate, "and endDate:", endDate);
    setLoading(true);
    try {
      // Format start and end dates
      const response = await fetch(`http://127.0.0.1:8000/billing_data/?start_date=${startDate}&end_date=${endDate}&region=${region}&granularity=${granularity}&metrics=${metrics}`, {
        headers: {
          accept: 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setApiData(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching billing data. Please try again later.');
      setLoading(false);
      console.error('Error fetching billing data:', error);
    }
  };
  const handleExportToExcel = () => {
    // Call your export function here
    exportToExcel(apiData);
  };
  // Inside MiniStatisticsCard component
  useEffect(() => {
    const fetchTotalCost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/total_cost/?start_date=${startDate}&end_date=${endDate}&region=${region}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Set the total cost based on the fetched data
        setTotalCost(data.total_cost);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTotalCost();
  }, [startDate, endDate, region]);

  const [totalCost, setTotalCost] = useState(null);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <SoftTypography variant="h6" fontWeight="medium">
                Display Settings
              </SoftTypography>
              <SoftButton variant="gradient" color="secondary" onClick={fetchBillingData}>
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp; Fetch Tables
              </SoftButton>
            </SoftBox>
            <SoftBox
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
              p={4}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                  <label style={{ fontSize: '14px', marginBottom: '8px' }}>
                    Start Date:
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ced4da',
                        backgroundColor: '#f8f9fa',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                        width: '100%',
                        boxSizing: 'border-box',
                        /* Apply custom font and color to the date format */
                        color: 'grey', // Change color
                        fontFamily: 'Arial, sans-serif', // Change font family
                      }}
                    />
                  </label>
                  <label style={{ fontSize: '14px', marginBottom: '8px' }}>
                    End Date:
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ced4da',
                        backgroundColor: '#f8f9fa',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                        width: '100%',
                        boxSizing: 'border-box',
                        /* Apply custom font and color to the date format */
                        color: 'grey', // Change color
                        fontFamily: 'Arial, sans-serif', // Change font family
                      }}
                    />
                  </label>
                </div>



                <div style={{ marginBottom: '30px' }} />
                <SoftSelection onRegionChange={handleRegionChange} />
              </div>

              <Grid item xs={10} md={10} style={{ marginTop: '10px', marginRight: '70px' }}>
                <MiniStatisticsCard
                  title={{ text: "Total Cost" }}
                  count={`$${totalCost}`}
                  percentage={{ color: "success" }}
                  icon={{ color: "secondary", component: "paid" }}
                  startDate={startDate}
                  endDate={endDate}
                  region={region}
                />
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <SoftBox py={-2}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <SoftTypography variant="h6" fontWeight="medium">
                Data Billing table
              </SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
              p={4}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <SuiSelect
                  placeholder="Select Granularity"
                  value={granularity}
                  onChange={handleGranularityChange}
                  options={[
                    { value: 'MONTHLY', label: 'MONTHLY' },
                    { value: 'DAILY', label: 'DAILY' },
                  ]}
                />
                <SuiSelect
                  placeholder="Select Metrics"
                  value={metrics}
                  onChange={handleMetricsChange}
                  options={[
                    { value: 'BlendedCost', label: 'BlendedCost' },
                    { value: 'UnblendedCost', label: 'UnblendedCost' },
                  ]}
                />
                <SoftButton className="export-button" onClick={handleExportToExcel}>
                  Export to Excel
                </SoftButton>
              </div>
              <div className="table-container" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {Array.isArray(apiData) && apiData.length > 0 && (
                  <table className="dynamic-table" style={{ width: 'auto', tableLayout: 'auto', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {Object.keys(apiData[0]).map((key, index) => (
                          <th key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {apiData.map((item, index) => (
                        <tr key={index}>
                          {Object.values(item).map((value, index) => (
                            <td key={index} style={{ padding: '8px', border: '1px solid #ddd' }}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
