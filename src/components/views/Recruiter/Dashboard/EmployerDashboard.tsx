import Banner from './Banner';
import JobChart from './JobChart';
import LeftSection from './LeftSection';
import RecentJobPosts from './RecentJobPosts';
import TopApplicants from './TopApplicants';
import TotalJobs from './TotalJobs';

const EmployerDashboard = () => {
  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-7 gap-12 px-32 bg-[#F8FAFC] py-6">
        <LeftSection />
        <div className="col-start-3 col-end-8">
          <Banner />
          <TopApplicants />
          <TotalJobs />
          <JobChart />
          <RecentJobPosts />
        </div>
      </div >
    </>
  )
}

export default EmployerDashboard