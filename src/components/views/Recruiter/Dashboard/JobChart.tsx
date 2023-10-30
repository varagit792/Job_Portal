import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {
        name: "Product Designer",
        uv: 320,
        pv: 180,
    },
    {
        name: "Sales Manager",
        uv: 320,
        pv: 150,
    },
    {
        name: "Java Developer",
        uv: 320,
        pv: 170,
    },
    {
        name: "HR Administration",
        uv: 320,
        pv: 140,
    },
    {
        name: "Graphic Designer",
        uv: 320,
        pv: 60,
    },
    {
        name: "Motion Designer",
        uv: 320,
        pv: 80,
    }
];

const JobChart = () => {
    return (
        <div className="mb-16 py-10 bg-[#EEF2FF] rounded-xl flex justify-center items-center">
            <BarChart
                width={800}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                barSize={18}
            >
                <XAxis dataKey="name" tick={{ fontSize: 12 }} scale="point" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="1 1" />
                <Bar
                    dataKey="pv"
                    fill="#9646E5"
                    background={{ fill: "#E0E7FF" }}
                    radius={[10, 10, 0, 0]}
                />
            </BarChart>
        </div>
    );
}
export default JobChart;