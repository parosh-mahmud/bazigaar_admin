import React, { Fragment } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
} from "recharts";

const datas = [
  {
    name: "Page A",
    uv: 590,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "Page B",
    uv: 868,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

export default function Charts({ data }) {
  console.log("data", data);
  return (
    <div className="mb-5 mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="overflow-x-scroll rounded-lg px-4 py-6 shadow-cardShadow">
        {/* top section  */}
        <div className="flex items-center justify-between gap-6">
          <div className="px-6 pb-6">
            <p className="text-[19px] font-medium leading-[33.25px] text-slate-800">
              ${data?.finance_total?.Total_Earnings}
            </p>
            <p className="text-base font-normal leading-7 text-neutral-400">
              Weekly Revenue
            </p>
          </div>
          <div className="inline-flex h-7 w-[164px] items-start justify-start gap-6">
            <div className="flex items-center justify-center gap-2">
              <div className="h-[13px] w-[13px] rounded-full bg-[#8884d8]" />
              <div className="text-base font-normal leading-7 text-[#8884d8]">
                Profit
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[13px] w-[13px] rounded-full bg-[#82ca9d]" />
              <div className="text-base font-normal leading-7 text-[#82ca9d]">
                Earnings
              </div>
            </div>
          </div>
          <div className="inline-flex h-5 w-20 items-center justify-start">
            <div
              className={`text-center text-lg font-bold leading-tight ${
                data?.finance_total?.curve === "up"
                  ? "text-neutral-950"
                  : "text-red-400"
              }`}>
              {data?.finance_total?.week}
            </div>
          </div>
        </div>
        {/* chart  */}
        <LineChart width={550} height={400} data={data?.finance_chart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="TicketSold" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line dataKey="Earnings" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div className="overflow-x-scroll rounded-lg px-4 py-6 shadow-cardShadow">
        {/* top section  */}
        <div className="flex items-center justify-between gap-6">
          <div className="px-6 pb-6">
            <p className="text-base font-medium leading-normal text-neutral-800">
              Daily Traffic
            </p>
            <div className="inline-flex items-center justify-start gap-2">
              <p className="text-[34px] font-bold leading-[42px] text-neutral-950">
                {data?.login_total?.Total_Site_Visitor}
              </p>
              <p className="text-base font-normal leading-normal text-neutral-400">
                Visitors
              </p>
            </div>
          </div>

          <div className="inline-flex h-5 w-20 items-center justify-start">
            <div
              className={`text-center text-lg font-bold leading-tight ${
                data?.login_total?.curve === "up"
                  ? "text-neutral-950"
                  : "text-red-400"
              }`}>
              {data?.login_total?.week}
            </div>
          </div>
        </div>
        {/* chart  */}
        <ComposedChart width={550} height={400} data={data?.login_chart}>
          <XAxis dataKey="Month" scale="band" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="Login"
            barSize={20}
            // fill="#008090"
            className="fill-bg-gradient-to-l rounded-t-full from-neutral-950 to-neutral-950 "
            radius={[10, 10, 0, 0]}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
        </ComposedChart>
      </div>
    </div>
  );
}
