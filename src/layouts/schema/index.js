import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from 'components/SoftButton';
import Axios from 'axios'; 

import * as XLSX from 'xlsx'; 
import { Card } from '@mui/material';

function Billing() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [region, setRegion] = useState('');
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tagValues, setTagValues] = useState([]);
  const [selectedTagValue, setSelectedTagValue] = useState('');
  const [newTagValue, setNewTagValue] = useState('');
  const [modifiedFilesMonthly, setModifiedFilesMonthly] = useState([]); // Define state variable for modifiedFilesMonthly
  const [modifiedFilesDaily, setModifiedFilesDaily] = useState([]); // 

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleTagValueChange = (event) => {
    setSelectedTagValue(event.target.value);
  };

  const handleNewTagValueChange = (event) => {
    setNewTagValue(event.target.value);
  };


  useEffect(() => {
    if (region && startDate && endDate) {
      console.log("Fetching tag options...");
      fetchTagOptions();
    }
  }, [region, startDate, endDate]);

  useEffect(() => {
    if (selectedTag) {
      console.log("Saving cost data...");
      saveCostForTagMonthly();
      saveCostByTagAndDateDaily();
      fetchTagValues();
    }
  }, [selectedTag]);

  const fetchTagOptions = async () => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/filtered_tag_keys/?region=${region}&start_date=${startDate}&end_date=${endDate}`);
      setTagOptions(response.data.filtered_tag_keys);
      console.log("Tag options fetched successfully.");
    } catch (error) {
      console.error("Error fetching tag options:", error);
    }
  };

  const fetchTagValues = async () => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/tag_values/${selectedTag}`);
      setTagValues(response.data.tag_values);
      console.log("Tag values fetched successfully.");
    } catch (error) {
      console.error("Error fetching tag values:", error);
    }
  };

  const saveCostForTagMonthly = async () => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/save_cost_for_tag_monthly/?start_date=${startDate}&end_date=${endDate}&region_name=${region}&tag_key=${selectedTag}`);
      console.log("Cost for tag monthly saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving cost for tag monthly:", error);
    }
  };

  const saveCostByTagAndDateDaily = async () => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/save_cost_by_tag_and_date_daily/?chosen_tag_key=${selectedTag}&region=${region}&start_date=${startDate}&end_date=${endDate}`);
      console.log("Cost by tag and date daily saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving cost by tag and date daily:", error);
    }
  };
  const modifyTagValues = async () => {
    try {
      const response = await Axios.post("http://127.0.0.1:8000/modify_tag_values", {
        tag_key: selectedTag,
        old_value: selectedTagValue,
        new_value: newTagValue
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error modifying tag values:", error);
    }
  };
  const applyModificationsMonthly = async () => {
    try {
      const url = `http://127.0.0.1:8000/apply_modifications_monthly/?start_date=${startDate}&end_date=${endDate}&tag_key=${selectedTag}`;
      const response = await Axios.post(url, '', {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error applying modifications monthly:", error);
    }
  };

  const applyModificationsDaily = async () => {
    try {
      const url = `http://127.0.0.1:8000/apply_modifications_daily/?start_date=${startDate}&end_date=${endDate}&tag_key=${selectedTag}`;
      const response = await Axios.post(url, '', {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error applying modifications daily:", error);
    }
  };
  const fetchModifiedFilesDaily = async () => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/display_modified_files_daily/?chosen_tag_key=${selectedTag}&start_date=${startDate}&end_date=${endDate}`);
      setModifiedFilesDaily(response.data);
    } catch (error) {
      console.error("Error fetching modified files daily:", error);
    }
  };

  // Function to fetch modified files monthly
  const fetchModifiedFilesMonthly = async () => {
    try {
      const response = await Axios.get(`http://127.0.0.1:8000/display_modified_files_monthly/?chosen_tag_key=${selectedTag}&start_date=${startDate}&end_date=${endDate}`);
      setModifiedFilesMonthly(response.data);
    } catch (error) {
      console.error("Error fetching modified files monthly:", error);
    }
  };

  const remainChanges = async () => {
    await applyModificationsMonthly();
    await applyModificationsDaily();
    await fetchModifiedFilesDaily();
    await fetchModifiedFilesMonthly();
  };

  const exportTableToExcel = (tableData, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, filename);
  };

  const handleExportMonthly = () => {
    exportTableToExcel(modifiedFilesMonthly, 'modified_files_monthly.xlsx');
  };

  const handleExportDaily = () => {
    exportTableToExcel(modifiedFilesDaily, 'modified_files_daily.xlsx');
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2} display="flex" flexDirection="column" >
              <SoftTypography variant="h3"> Tag Value Impact Analyzer :</SoftTypography>
              <div style={{ marginBottom: '20px' }} />
              <SoftTypography variant="h6">Explore the impact of tag value adjustments on AWS billing data.</SoftTypography><SoftTypography variant="h6"> View billing data regrouped based on modified tag values.</SoftTypography>
            </SoftBox>

            <SoftBox
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
              p={4}
            >
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '55px' }}>
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
                        color: 'grey',
                        fontFamily: 'Arial, sans-serif',
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
                        color: 'grey',
                        fontFamily: 'Arial, sans-serif',
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
                        color: 'grey',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    />
                  </label>
                </div>
                <div style={{ marginBottom: "25px" }} />
                <label style={{ display: 'block', marginBottom: '8px',  fontSize: '14px'}}>Select Tag:</label>
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
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  <option value="">Select Tag</option>
                  {tagOptions.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <div style={{ marginBottom: '25px' }} />

                <label style={{ display: 'block', marginBottom: '8px',fontSize: '14px' }}>Select Tag Value:</label>
                <select
                  value={selectedTagValue}
                  onChange={handleTagValueChange}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#f8f9fa',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    width: '100%',
                    boxSizing: 'border-box',
                    color: 'grey',
                    fontFamily: 'Arial, sans-serif',
                  }}
                >
                  <option value="">Select Tag Value</option>
                  {tagValues.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
                <div style={{ marginBottom: '25px' }} />

                <label style={{ display: 'block', marginBottom: '8px',fontSize: '14px' }}>New Tag Value :</label>
                <input
                  type="text"
                  value={newTagValue}
                  onChange={handleNewTagValueChange}
                  placeholder="New Tag Value"
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ced4da',
                    backgroundColor: '#f8f9fa',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    width: '100%',
                    boxSizing: 'border-box',
                    color: 'grey',
                    fontFamily: 'Arial, sans-serif',
                  }}
                />

                <div style={{ marginBottom: '20px' }} />
                <div style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
                  <SoftButton onClick={modifyTagValues}>Modify Tag Values</SoftButton>
                  <SoftButton onClick={remainChanges}>Remain Changes</SoftButton>
                </div>
              </div>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <SoftBox py={-2}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <SoftButton variant="contained" color="dark" onClick={handleExportMonthly}>Export Monthly Data</SoftButton>
                 <SoftButton variant="contained" color="dark" onClick={handleExportDaily}>Export Daily Data</SoftButton>
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
                        {modifiedFilesMonthly.map((file, index) => (
                          <tr key={index}>
                            <td>{file.tag_key}</td>
                            <td>{file.tag_value}</td>
                            <td>{file.total_cost}</td>
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
                        {modifiedFilesDaily.map((file, index) => (
                          <tr key={index}>
                            <td>{file.tag_key}</td>
                            <td>{file.tag_value}</td>
                            <td>{file.date}</td>
                            <td>{file.cost}</td>
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

      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
