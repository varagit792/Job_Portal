import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../../../../assets/svg/Dashboard.svg";
import Line from "../../../../assets/svg/Line.svg";
import Chart from "../../../../assets/svg/Chart.svg";
import Password from "../../../../assets/svg/Password.svg";
import { useAppDispatch } from "../../../..";
import { formDataReset } from "../../../../store/reducers/jobs/postJobs";
import { resetJobDetail } from "../../../../store/reducers/jobs/GetJobDetails";

const Banner = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const postAJob = () => {
        dispatch(formDataReset())
        dispatch(resetJobDetail())
        navigate(`/postJob/jobDetails`);
    }

    return (
        <div className="bg-gradient-to-r from-[#E0E7FF] from-10% to-[#a56aff] to-80% rounded-lg mb-16 grid grid-cols-5 gap-8 px-10 py-16 relative overflow-hidden">
            <div className="col-start-1 col-end-4 flex flex-col justify-center z-10">
                <h1 className="text-3xl font-bold text-[#312E81] flex flex-col items-start justify-start mb-10">
                    <span> Discover the <span className="text-[#818CF8]">best talent</span> & grow you company</span>
                </h1>
                <div className="flex justify-start items-center">
                    <button onClick={() => postAJob()} className="bg-[#4F46E5] rounded-md py-3 text-white w-32 flex items-center justify-center mr-3 font-semibold"><span className="mr-3">New Job</span><span>+</span></button>
                    <button className="rounded-md py-3 bg-white text-[#312E81] w-44 flex items-center justify-center font-semibold">Explore talent</button>
                </div>
            </div>
            <div className="bg-gradient-to-r from-[#b78cf7] from-10% to-[#a56aff] to-80% w-96 h-96 rounded-full absolute top-0 left-1/2 -translate-y-2/3 z-0"></div>
            <div className="bg-[#a56aff] w-72 h-72 rounded-full absolute top-full left-3/4 -translate-y-3/4 z-0"></div>
            <div className="relative col-start-4 col-end-6 flex justify-start items-center z-10">
                <div className="relative">
                    <img src={Dashboard} alt="Dashboard" />
                    <img src={Line} alt="Line" className="absolute z-10 top-2/3 -translate-y-2/3 left-1/2 -translate-x-1/2" />
                    <div className="absolute z-20 top-1/3 translate-y-1/2 right-1/2 -translate-x-1/3 bg-[#818CF8] pt-8 pb-5 px-5 rounded-lg">
                        <img src={Chart} alt="Chart" />
                    </div>
                    <img src={Password} alt="Password" className="absolute z-20 top-2/3 -translate-y-2/3 right-0 translate-x-1/2" />
                </div>
            </div>
        </div>
    )
}

export default Banner