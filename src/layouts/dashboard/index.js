import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import MixedChart from "examples/Charts/MixedChart";
import typography from "assets/theme/base/typography";

function Dashboard() {
  const { size } = typography;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [totalCost, setTotalCost] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [lastMonthCost, setLastMonthCost] = useState(null);
  const [datachartData, setdataChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("http://127.0.0.1:8000/total_cost_year_to_date/", {
          headers: {
            Accept: "application/json",
          },
        });

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        // Extract labels and data from the response
        const labels = Object.keys(data);
        const datasets = [
          {
            label: "Total Cost",
            data: Object.values(data),
            color: "info", // Color of the chart (optional, defaults to dark)
            chartType: "default-line", // Type of the chart (optional, defaults to default-line)
          },
        ];

        // Update chart data state
        setChartData({ labels, datasets });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  useEffect(() => {
    const fetchTotalCost = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/total_cost_current_month/?region=eu-west-1");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Extract month and total cost from the response
        const month = Object.keys(data)[0];
        const cost = data[month];

        setCurrentMonth(month);
        setTotalCost(cost);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTotalCost();
  }, []);

  useEffect(() => {
    const fetchLastMonthCost = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/last_month_total_cost/?region=eu-west-1");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setLastMonthCost(data.total_cost);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLastMonthCost();
  }, []);

  useEffect(() => {
    const fetchTotalCostCurrentWeek = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/evolution_total_cost_current_week/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Transforming data for DefaultLineChart
        const labels = Object.keys(data);
        const transformedData = labels.map(label => ({ label, value: data[label] }));
        setdataChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTotalCostCurrentWeek();
  }, []);

  const defaultChartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Total Costs",
        data: [100, 150, 200, 180, 220, 250, 230],
        color: "primary",
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} >
              <MiniStatisticsCard
                title={{ text: `${currentMonth}'s Cost` }}
                count={`$${totalCost}`}
                percentage={{ color: "success" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <MiniStatisticsCard
                title={{ text: "Last Month Cost" }}
                count={`$${lastMonthCost}`}
                percentage={{ color: "success", text: "+3%" }} // You can adjust the percentage as needed
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets
                title="Documentation"
                paragraph="In AWS data billing regroupment, tags are key. They help organize resources enabling efficient cost tracking ."
                link="https://vermeg.com"
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          
            <Grid item xs={12} lg={5}>
              <MixedChart
                title="Total cost Over previous Months "
                description="Comparison of sales and expenses over time"
                height={400} // Adjust the height as needed
                chart={chartData}
              />
          

            <Grid item xs={12} lg={7}>
              
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>

          </Grid>
          <Grid item xs={12} md={6} lg={4}>

          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
