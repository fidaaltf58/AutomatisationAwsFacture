import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from 'components/SoftButton';
import Transaction from './components/Transaction';
import WorkWithTheRockets from 'layouts/dashboard/components/WorkWithTheRockets';
import { Card } from '@mui/material';
import * as XLSX from 'xlsx'; 

function Billing() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [region, setRegion] = useState('');
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [billingData, setBillingData] = useState([]);
  const [costByTagTable, setCostByTagTable] = useState([]);

  useEffect(() => {
    // Fetch tag options when region and date range change
    if (region && startDate && endDate) {
      fetchTagOptions();
    }
  }, [region, startDate, endDate]);

  const fetchTagOptions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/filtered_tag_keys/?region=${region}&start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTagOptions(data.filtered_tag_keys);
    } catch (error) {
      console.error("Error fetching tag options:", error);
    }
  };

  const handleTagChange = (event) => {
    const selectedOption = event.target.value;
    console.log("Selected Option:", selectedOption); // Check the selected option in the console
    setSelectedTag(selectedOption); // Set the selected tag
  };

  const handleFetchTables = async () => {
    if (selectedTag) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cost_for_tag/?start_date=${startDate}&end_date=${endDate}&region_name=${region}&tag_key=${selectedTag}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBillingData(data);

        const response2 = await fetch(`http://127.0.0.1:8000/cost_by_tag_table/?chosen_tag_key=${selectedTag}&region=${region}&start_date=${startDate}&end_date=${endDate}`);
        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }
        const data2 = await response2.json();
        setCostByTagTable(data2);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    } else {
      console.error("Please select a tag before fetching tables.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>

          <Card>

            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <SoftTypography variant="h4">Tag-based Billing Analysis</SoftTypography>
              <SoftBox>
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
                      <label style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Region:
                        <input
                          type="text"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
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

                    <select

                      value={selectedTag}
                      onChange={handleTagChange}
                      style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ced4da',
                        backgroundColor: '#f8f9fa',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                        width: '100%',
                        boxSizing: 'border-box',
                        color: 'grey',
                        fontFamily: 'Arial, sans-serif', // Change font family
                      }}
                    >
                      <option value="">Select Tag</option>
                      {tagOptions.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', gap: '26px', alignItems: 'center', marginBottom:"10px" }}>
                      <SoftButton onClick={handleFetchTables}>Click to Fetch Tables</SoftButton>
                    </div>
                    </div>
                </SoftBox>
              </SoftBox>

            </SoftBox>
          </Card>
        </SoftBox>


        <SoftBox py={-2}>
          <SoftBox mb={3}>
                      <Card>
            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
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


              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <SoftTypography variant="h6" fontWeight="medium">
                   MONTHLY
                  </SoftTypography>
                  <div className="table-container-table1" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #e0e0e0" }}>
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Tag Key</th>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Tag Value</th>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Total Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingData.map((item, index) => (
                          <tr key={index}>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.tag_key}</td>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.tag_value}</td>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.total_cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </Grid>
                <Grid item xs={12} md={7}>
                  <SoftTypography variant="h6" fontWeight="medium">
                    DAILY
                  </SoftTypography>
                  <div className="table-container-table2" style={{ maxHeight: "400px", overflowY: "scroll" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #e0e0e0" }}>
                      <thead>
                        <tr>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Tag Key</th>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Tag Value</th>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Date</th>
                          <th style={{ border: "1px solid #e0e0e0", padding: "8px", backgroundColor: "#f5f5f5" }}>Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costByTagTable.map((item, index) => (
                          <tr key={index}>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.tag_key}</td>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.tag_value}</td>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.date}</td>
                            <td style={{ border: "1px solid #e0e0e0", padding: "8px" }}>{item.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </Grid>
              </Grid>
              
            </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        
      </SoftBox>



      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
