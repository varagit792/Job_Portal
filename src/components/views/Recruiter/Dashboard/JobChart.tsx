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
        pv: 180,
    },
    {
        name: "Sales Manager",
        pv: 150,
    },
    {
        name: "Java Developer",
        pv: 170,
    },
    {
        name: "HR Administration",
        pv: 140,
    },
    {
        name: "Graphic Designer",
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
        <div className="mb-16 p-10 bg-[#EEF2FF] rounded-xl flex justify-center items-center flex-col">
            <div className="mb-8 flex justify-between items-center w-full">
                <h1 className="text-xl font-bold">Applications received for latest jobs posted</h1>
                <div className="flex justify-end items-center">
                    <div className=" flex justify-center items-center"><span className="bg-[#E0E7FF] w-2 h-2 block rounded-full mr-1"></span><span className="text-xs text-[#475569] mr-2">Total Applications</span></div>
                    <div className=" flex justify-center items-center"><span className="bg-[#9546E5] w-2 h-2 block rounded-full mr-1"></span><span className="text-xs text-[#475569]">Applications Reviewed</span></div>
                </div>
            </div>
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