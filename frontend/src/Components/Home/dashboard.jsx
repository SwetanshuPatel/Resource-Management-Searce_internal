import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { PieChart } from "@mui/x-charts/PieChart";
import "./dashboard.css";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import LinearProgress from "@mui/material/LinearProgress";
import AttributionIcon from "@mui/icons-material/Attribution";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./tablestyle.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [revenue, setData1] = useState("");
  const [count1, setData2] = useState("");
  const [count2, setData3] = useState("");
  const [answer, setData4] = useState("");
  let percent = Number.parseInt(answer.answer);
  const [forecast, setData5] = useState("");
  const [opporcount, setData6] = useState("");
  const [tabledata, setData7] = useState([]);
  const foreamount = Number.parseInt(forecast.sum);
  const [loading, setLoading] = useState(true);
  const [revenueData, setChartData] = useState([]);
  const [progressData, setprogressData] = useState([]);
  const [freenum, setfreenum] = useState("");
  let finalfree = Number.parseInt(freenum.count);
  
  if(isNaN(finalfree)){
    finalfree = 0;
  }

  if(isNaN(percent)){
    percent = 0;
  }

  useEffect(() => {
    getData();
    getData1();
    getData2();
    getData3();
    getData4();
    getData5();
    getData6();
    getData7();
    getData8();
    getData9();
  }, []);

  const getData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/budget"
      );

      if (status === 200) {
        setLoading(false);
        setData1(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData1 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/customer"
      );

      if (status === 200) {
        setLoading(false);
        setData2(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData2 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/resource"
      );

      if (status === 200) {
        setLoading(false);
        setData3(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData3 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/progress"
      );

      if (status === 200) {
        setLoading(false);
        setData4(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData4 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/forecast"
      );

      if (status === 200) {
        setLoading(false);
        setData5(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData5 = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/home/getrevenueData"
      );

      const chartData = data.map((item) => ({
        label: item.project_name,
        value: item.budget,
      }));

      setChartData(chartData);
    } catch (error) {
      console.error("Error fetching data: " + error);
    }
  };

  const getData6 = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/home/getprogressData"
      );

      const chartData = data.map((item) => ({
        label: item.project_name,
        value: item.billable_in_percent,
      }));

      setprogressData(chartData);
    } catch (error) {
      console.error("Error fetching data: " + error);
    }
  };

  const getData7 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/opporcount"
      );

      if (status === 200) {
        setLoading(false);
        setData6(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData8 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/tabledata"
      );

      if (status === 200) {
        setLoading(false);
        setData7(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData9 = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/freenum"
      );

      if (status === 200) {
        setLoading(false);
        setfreenum(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function formatNumberToK(number) {
    if (number) {
      if (number >= 1000) {
        return (number / 1000).toFixed(1) + "k";
      } else {
        return number.toString();
      }
    }
  }

  return (
    <div>
      {loading ? (
        <p>Please Wait...</p>
      ) : (
        <div className="dashboard-container">
          <header className="dashboard-header">
            <br></br>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Item>
                    <b>REVENUE</b>
                    <div className="budget-content">
                      <div className="budget-total">
                        <span>$ {formatNumberToK(revenue.sum)}</span>
                      </div>
                      <div className="budget-image">
                        <PaidIcon sx={{ fontSize: 80 }} />
                      </div>
                    </div>
                    <br></br>
                    <div className="forecast">
                      <div>
                        <p>
                          <b>Forecast:</b>
                        </p>
                      </div>
                      <div className="amount">
                        <p>
                          <span className="up-arrow">&#8593;</span>
                          {formatNumberToK(foreamount)}
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid xs={3}>
                  <Item>
                    <b>CUSTOMER</b>
                    <div className="customer-content">
                      <div className="customer-total">
                        <span>{count1.count}</span>
                      </div>
                      <div className="customer-image">
                        <PersonIcon sx={{ fontSize: 80 }} />
                      </div>
                    </div>
                    <br></br>
                    <div className="forecast">
                      <div>
                        <p>
                          <b>Forecast:</b>
                        </p>
                      </div>
                      <div className="amount">
                        <p>
                          <span className="up-arrow">&#8593;</span>{" "}
                          {opporcount.count}
                        </p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid xs={3}>
                  <Item>
                    <b>RESOURCES</b>
                    <div className="resource-content">
                      <div className="resource-total">
                        <span>{count2.count}</span>
                      </div>
                      <div className="resource-image">
                        <AttributionIcon sx={{ fontSize: 80 }} />
                      </div>
                    </div>
                    <br></br>
                    <div className="forecast">
                      <div>
                        <p>
                          <b>Available Resource(s):</b>
                        </p>
                      </div>
                      <div className="amount">
                        <p>{finalfree}</p>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid xs={3}>
                  <Item>
                    <b>PROGRESS</b>
                    <div className="progress-content">
                      <div className="progress-total">
                        <span>{percent}%</span>
                      </div>
                      <div className="progress-image">
                        <CheckCircleIcon sx={{ fontSize: 80 }} />
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: "100%", mr: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={percent}
                          />
                        </Box>
                      </Box>
                    </div>
                  </Item>
                </Grid>
                <Grid xs={4}>
                  <Item>
                    <h1>
                      <b>REVENUE CHART</b>
                    </h1>
                    <PieChart
                      series={[
                        {
                          hidden:false,
                          data: revenueData,
                          innerRadius: 90,
                          outerRadius: 110,
                          paddingAngle: 0.5,
                          cornerRadius: 5,
                          startAngle: 0,
                          endAngle: 360,
                          cx: 120,
                          cy: 150,
                        },
                      ]}
                      width={425}
                      height={300}
                    />
                    <span>Total Revenue: $ {formatNumberToK(revenue.sum)}</span>
                  </Item>
                </Grid>
                <Grid xs={4}>
                  <Item>
                    <h1>
                      <b>RESOURCES PROGRESS</b>
                    </h1>
                    <br />
                    <div className="table-scroll">
                      <table class="table-container-dashboard">
                        <thead>
                          <tr>
                            <th>RESOURCE</th>

                            <th>PROJECT</th>

                            <th>PROGRESS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tabledata.map((data, index) => (
                            <tr key={index}>
                              <td>{data.resource_name}</td>
                              <td>{data.projects}</td>
                              <td>{data.utilizations}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Item>
                </Grid>
                <Grid xs={4}>
                  <Item>
                    <h1>
                      <b>PROGRESS CHART</b>
                    </h1>
                    <PieChart
                      series={[
                        {
                          data: progressData,
                          innerRadius: 90,
                          outerRadius: 110,
                          paddingAngle: 0.5,
                          cornerRadius: 5,
                          startAngle: 0,
                          endAngle: 360,
                          cx: 120,
                          cy: 150,
                        },
                      ]}
                      width={425}
                      height={300}
                    />
                    <span>Total Progress: {percent}%</span>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </header>
          <main className="dashboard-content"></main>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
