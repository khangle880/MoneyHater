import { IonCard, IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO, subDays } from "date-fns";

//? IONIC COMPONENTS
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
} from "recharts";

//? STYLED
import "./ReportPage.scss";
import {
  categories,
  currentWallet,
  findCategory,
} from "../../Necessary/components";
import dayjs from "dayjs";

const ReportPage: React.FC = () => {
  const [totalThisMonthAmountExpense, setTotalThisMonthAmountExpense] =
    useState(0);
  const [totalLastMonthAmountExpense, setTotalLastMonthAmountExpense] =
    useState(0);
  const [totalThisMonthNumberExpense, setTotalThisMonthNumberExpense] =
    useState(0);
  const [totalLastMonthNumberExpense, setTotalLastMonthNumberExpense] =
    useState(0);

  const [totalThisMonthAmountIncome, setTotalThisMonthAmountIncome] =
    useState(0);
  const [totalLastMonthAmountIncome, setTotalLastMonthAmountIncome] =
    useState(0);
  const [totalThisMonthNumberIncome, setTotalThisMonthNumberIncome] =
    useState(0);
  const [totalLastMonthNumberIncome, setTotalLastMonthNumberIncome] =
    useState(0);

  useEffect(() => {
    //? Expense
    // calculate this month
    var thisMonthAmount = 0;
    var thisMonthNumber = 0;
    const today = dayjs();
    const startOfThisMonth = today.startOf("M").toISOString();
    const endOfThisMonth = today.endOf("M").toISOString();

    currentWallet.transactions
      .filter(
        (transaction) =>
          transaction.executed_time <= endOfThisMonth &&
          transaction.executed_time >= startOfThisMonth &&
          findCategory(transaction.category)!.type === "Expense"
      )
      .forEach((child) => {
        thisMonthAmount += child.amount_by_wallet;
        thisMonthNumber++;
      });
    setTotalThisMonthAmountExpense(thisMonthAmount);
    setTotalThisMonthNumberExpense(thisMonthNumber);

    // calculate last month
    var lastMonthAmount = 0;
    var lastMonthNumber = 0;
    const startOfLastMonth = today.add(-1, "M").startOf("M").toISOString();
    const endOfLastMonth = today.add(-1, "M").endOf("M").toISOString();

    currentWallet.transactions
      .filter(
        (transaction) =>
          transaction.executed_time <= endOfLastMonth &&
          transaction.executed_time >= startOfLastMonth &&
          findCategory(transaction.category)!.type === "Income"
      )
      .forEach((child) => {
        lastMonthAmount += child.amount_by_wallet;
        lastMonthNumber++;
      });
    setTotalLastMonthAmountExpense(lastMonthAmount);
    setTotalLastMonthNumberExpense(lastMonthNumber);

    //? Income
    // calculate this month
    var thisMonthAmount = 0;
    var thisMonthNumber = 0;

    currentWallet.transactions
      .filter(
        (transaction) =>
          transaction.executed_time <= endOfThisMonth &&
          transaction.executed_time >= startOfThisMonth
      )
      .forEach((child) => {
        thisMonthAmount += child.amount_by_wallet;
        thisMonthNumber++;
      });
    setTotalThisMonthAmountIncome(thisMonthAmount);
    setTotalThisMonthNumberIncome(thisMonthNumber);

    // calculate last month
    var lastMonthAmount = 0;
    var lastMonthNumber = 0;

    currentWallet.transactions
      .filter(
        (transaction) =>
          transaction.executed_time <= endOfLastMonth &&
          transaction.executed_time >= startOfLastMonth
      )
      .forEach((child) => {
        lastMonthAmount += child.amount_by_wallet;
        lastMonthNumber++;
      });
    setTotalLastMonthAmountIncome(lastMonthAmount);
    setTotalLastMonthNumberIncome(lastMonthNumber);
  }, []);

  const data = [];
  for (let index = 15; index >= 0; index--) {
    data.push({
      date: subDays(new Date(), index).toISOString().substring(0, 10),
      value: 10 + Math.random(),
      value2: 1 + Math.random(),
      //@param value: expend, value2: income
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen forceOverscroll={true} scrollY={false}>
        <IonCard className="report-card">
          {/*//? This is for Total expand */}
          <div className="progress-card">
            <div className="progress-detail-top">
              <p className="progress-card-header">Total Expenses</p>
              <p className="progress-card-subheader">
                {totalThisMonthAmountExpense}
              </p>
            </div>
            <p className="progress-date">This month</p>
            {/*//TODO Add percentage here! */}
            <ProgressBar
              className="progress-bar-holder"
              now={
                (totalThisMonthAmountExpense / totalLastMonthAmountExpense) *
                100
              }
            />
            <div className="progress-detail-bottom">
              <p className="progress-date">Last month</p>
              {/*//TODO Add percentage here! */}
              <p className="progress-detail">
                {(totalThisMonthAmountExpense / totalLastMonthAmountExpense) *
                  100}{" "}
                %
              </p>
            </div>
          </div>

          {/*//? This is for Total transactions */}
          <div className="progress-card">
            <div className="progress-detail-top">
              <p className="progress-card-header">Total Transactions</p>
              <p className="progress-card-subheader">
                {totalThisMonthNumberExpense}
              </p>
            </div>
            <p className="progress-date">This month</p>
            {/*//TODO Add percentage here! */}
            <ProgressBar
              className="progress-bar-holder"
              now={
                (totalThisMonthNumberExpense / totalLastMonthNumberExpense) *
                100
              }
            />
            <div className="progress-detail-bottom">
              <p className="progress-date">Last month</p>
              {/*//TODO Add percentage here! */}
              <p className="progress-detail">
                {(totalThisMonthNumberExpense / totalLastMonthNumberExpense) *
                  100}{" "}
                %
              </p>
            </div>
          </div>

          {/*//? This is for Total Income */}
          <div className="progress-card">
            <div className="progress-detail-top">
              <p className="progress-card-header">Total Income</p>
              <p className="progress-card-subheader">
                {totalThisMonthAmountIncome}
              </p>
            </div>
            <p className="progress-date">This month</p>
            {/*//TODO Add percentage here! */}
            <ProgressBar
              className="progress-bar-holder"
              now={
                (totalThisMonthAmountIncome / totalLastMonthAmountIncome) * 100
              }
            />
            <div className="progress-detail-bottom">
              <p className="progress-date">Last month</p>
              {/*//TODO Add percentage here! */}
              <p className="progress-detail">
                {(totalThisMonthAmountIncome / totalLastMonthAmountIncome) *
                  100}{" "}
                %
              </p>
            </div>
          </div>

          {/*//? React chart expend */}
          <div className="chart-card">
            <div className="chart-card-title">
              <div className="card-title-container">
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  Expand
                </p>
                <p
                  style={{
                    color: "#8f9393",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  This month
                </p>
              </div>
            </div>
            <div className="chart-card-chart">
              <ResponsiveContainer width="100%" height={330}>
                {/*//TODO INPUT JSON DATA HERE!  */}
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorExpend"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      {" "}
                      <stop
                        offset="0%"
                        stopColor="#2451b7"
                        stopOpacity={0.4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor="#2451b7"
                        stopOpacity={0.05}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2451b7"
                    fill="url(#colorExpend)"
                    isAnimationActive={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(str: string) => {
                      const date = parseISO(str);
                      const todaysDate = new Date();
                      if (
                        date.setHours(0, 0, 0, 0) ===
                        todaysDate.setHours(0, 0, 0, 0)
                      ) {
                        return format(date, "MMM, d");
                      }
                      return "";
                    }}
                  />
                  <YAxis
                    dataKey="value"
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number: number) => `$${number.toFixed(2)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/*//? React chart income */}
          <div className="chart-card">
            <div className="chart-card-title">
              <div className="card-title-container">
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  Income
                </p>
                <p
                  style={{
                    color: "#8f9393",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  This month
                </p>
              </div>
            </div>
            <div className="chart-card-chart">
              <ResponsiveContainer width="100%" height={330}>
                {/*//TODO INPUT JSON DATA HERE!  */}
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      {" "}
                      <stop
                        offset="0%"
                        stopColor="#82ca9d"
                        stopOpacity={0.4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor="#82ca9d"
                        stopOpacity={0.05}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value2"
                    stroke="#82ca9d"
                    fill="url(#colorIncome)"
                    isAnimationActive={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(str: string) => {
                      const date = parseISO(str);
                      const todaysDate = new Date();
                      if (
                        date.setHours(0, 0, 0, 0) ===
                        todaysDate.setHours(0, 0, 0, 0)
                      ) {
                        return format(date, "MMM, d");
                      }
                      return "";
                    }}
                  />
                  <YAxis
                    dataKey="value2"
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number: number) => `$${number.toFixed(2)}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/*//? React chart block */}
          <div className="chart-card">
            <div className="chart-card-title">
              <div className="card-title-container">
                <p
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: 700,
                  }}
                >
                  Compare chart
                </p>
                <p
                  style={{
                    color: "#8f9393",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  This month
                </p>
              </div>
            </div>
            <div className="chart-card-chart">
              <ResponsiveContainer width="100%" height={330}>
                {/*//TODO INPUT JSON DATA HERE!  */}
                <BarChart data={data}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      {" "}
                      <stop
                        offset="0%"
                        stopColor="#2451b7"
                        stopOpacity={0.4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor="#2451b7"
                        stopOpacity={0.05}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2451b7"
                    fill="url(#color)"
                    isAnimationActive={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(str: string) => {
                      const date = parseISO(str);
                      const todaysDate = new Date();
                      if (
                        date.setHours(0, 0, 0, 0) ===
                        todaysDate.setHours(0, 0, 0, 0)
                      ) {
                        return format(date, "MMM, d");
                      }
                      return "";
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number: number) => `$${number.toFixed(2)}`}
                  />
                  <Tooltip content={<CustomToolTipBarChart />} />
                  <CartesianGrid opacity={0.1} vertical={false} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar
                    name="Expend"
                    dataKey="value"
                    stackId="a"
                    fill="#2451b7"
                  />
                  <Bar
                    name="Income"
                    dataKey="value2"
                    stackId="a"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

//? THIS IS FOR RECHART TOOLTIPS
function CustomTooltip({ active, payload, label }: any) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-date">
          {format(parseISO(label), "eeee, d, MMM")}
        </p>
        <p>${payload[0].value.toFixed(2)} USD</p>
      </div>
    );
  }
  return null;
}

function CustomToolTipBarChart({ active, payload, label }: any) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-date">
          {format(parseISO(label), "eeee, d, MMM")}
        </p>
        <p>Expend ${payload[0].value.toFixed(2)} USD</p>
        <p>Income ${payload[1].value.toFixed(2)} USD</p>
      </div>
    );
  }
  return null;
}

export default ReportPage;
