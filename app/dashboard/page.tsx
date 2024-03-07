import { AreaChart, BarChart, PieChart } from "@mantine/charts";
import { Center } from "@mantine/core";

const dataAgentDemo = [
  { month: "January", Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: "February", Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: "March", Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: "April", Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: "May", Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: "June", Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

const dataTrend = [
  {
    date: "Mar 22",
    Apples: 50,
  },
  {
    date: "Mar 23",
    Apples: 60,
  },
  {
    date: "Mar 24",
    Apples: 40,
  },
  {
    date: "Mar 25",
    Apples: 30,
  },
  {
    date: "Mar 26",
    Apples: 0,
  },
  {
    date: "Mar 27",
    Apples: 20,
  },
  {
    date: "Mar 28",
    Apples: 20,
  },
  {
    date: "Mar 29",
    Apples: 10,
  },
];
const dataProduct = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 300, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

const Page = () => {
  return (
    <div>
      <div className="mb-5">
        <div className="flex items-center mx-auto justify-center ">
          <h1>Agents</h1>
        </div>
        <BarChart
          h={300}
          data={dataAgentDemo}
          dataKey="month"
          xAxisProps={{ padding: { left: 30, right: 30 } }}
          series={[
            { name: "Smartphones", color: "violet.6" },
            { name: "Laptops", color: "blue.6" },
            { name: "Tablets", color: "teal.6" },
          ]}
        />
      </div>
      <div className="mb-5">
        <div className="flex items-center mx-auto justify-center">
          <h1>Trends</h1>
        </div>
        <AreaChart
          h={300}
          data={dataTrend}
          dataKey="date"
          yAxisProps={{ domain: [0, 100] }}
          series={[{ name: "Apples", color: "indigo.6" }]}
        />
      </div>

      <div className="mb-5">
        <div className="flex flex-col items-center mx-auto justify-center">
          <h1>Products</h1>
          <PieChart data={dataProduct} size={200} withTooltip />
        </div>
      </div>
    </div>
  );
};

export default Page;
