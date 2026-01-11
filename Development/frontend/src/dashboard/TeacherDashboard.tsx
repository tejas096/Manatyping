import { useEffect, useState } from "react";
import api from "../api/axios";
import { LineChart, Line, XAxis, YAxis } from "recharts";

export default function TeacherDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/sessions/last/keystrokes").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="index" />
      <YAxis />
      <Line dataKey="delta" stroke="#38bdf8" />
    </LineChart>
  );
}
