import "react-multi-carousel/lib/styles.css";
import ProfileLeftSection from "./ProfileLeftSection";
import { useAppDispatch, useAppSelector } from "../../..";
import { useEffect } from "react";
import { profileDashboardGet, clearGetProfileDashboardSlice } from '../../../store/reducers/jobSeekerProfile/ProfileDashboardGet';
import MostDemandingCategory from "./MostDemandingCategory";
import JobRecommendations from "./JobRecommendations";
import TopCompaniesHiring from "./TopCompaniesHiring";
import FeaturedCity from "./FeaturedCity";
import ProfileBanner from "./ProfileBanner";

const HomePage = () => {

    const dispatch = useAppDispatch();
    const { success, profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

    useEffect(() => {
        dispatch(profileDashboardGet());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(clearGetProfileDashboardSlice());
        }
    }, [dispatch, success]);

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-7 gap-12 px-32 bg-[#F8FAFC] py-6">
                <ProfileLeftSection profileDashboard={profileDashboard} />
                <div className="col-start-3 col-end-8">
                    <ProfileBanner />
                    <MostDemandingCategory />
                    <JobRecommendations />
                    <hr className="my-10" />
                    <TopCompaniesHiring />
                    <hr className="my-10" />
                    <FeaturedCity />
                </div>
            </div >
        </>
    )
}

export default HomePage;