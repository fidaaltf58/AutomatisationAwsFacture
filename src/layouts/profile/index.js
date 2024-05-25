import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./app.css"; // Import custom styles
import SoftBox from "components/SoftBox";
import { Card, Box } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftTypography from "components/SoftTypography";
import { position } from "stylis";
function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const dataRef = useRef(null); // Ref to capture the data content

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get("http://localhost:8000/modification_history");
              setData(response.data);
              setError(null);  // Clear any previous errors
          } catch (error) {
              console.error("Error fetching data: ", error);
              setError(error);
          }
      };

      fetchData();

      const intervalId = setInterval(fetchData, 10000);

      return () => clearInterval(intervalId);
  }, []);

  const renderValue = (value) => {
      if (typeof value === 'object' && value !== null) {
          return <pre>{JSON.stringify(value, null, 2)}</pre>;
      }
      return <span>{value}</span>;
  };

  const downloadPDF = async () => {
      const element = dataRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("modification_history.pdf");
  };

    return (
      <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <Card>
        <div className="App">
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
                <SoftTypography variant="h4">Modification History</SoftTypography>
            </Box>
            {error ? (
                <div className="error">Error: {error.message}</div>
            ) : (
                <div>
                    <table className="report-table" ref={dataRef}>
                        <thead>
                            <tr>
                                {data.length > 0 && Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id}>
                                    {Object.entries(item).map(([key, value]) => (
                                        <td key={key}>{renderValue(value)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={downloadPDF} className="download-button">Download PDF</button>
                </div>
            )}
        
        </div>
        </Card>
        </SoftBox>
        </DashboardLayout>
    );
}

export default App;
