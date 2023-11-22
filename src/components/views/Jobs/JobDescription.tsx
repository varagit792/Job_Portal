import { Fragment, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import ShortJobCard from '../../commonComponents/ShortJobCard';
import { useAppDispatch, useAppSelector } from '../../..';
import { getJobDetail } from '../../../store/reducers/jobs/GetJobDetails';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import companyLogo from '../../../assets/png/company_logo.png';
import experienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import moneyIcon from '../../../assets/svg/MoneyIcon.svg';
import locationIcon from '../../../assets/svg/LocationIcon.svg';
import bookMarkIcon from '../../../assets/svg/bookMark.svg';
import peopleIcon from '../../../assets/svg/peopleIcon.svg';
import rightArrow from '../../../assets/svg/ArrowRight.svg';
import Modal from '../../commonComponents/Modal';
import ApplyJobs from './ApplyJobs/ApplyJobs';
import { ToastContainer, toast } from 'react-toastify';
import { IFormApplyJobs, IFormApplyJobsWithoutQuestionnaire } from '../../../interface/jobSeeker/applyJobs';
import { applyJobsSchema } from '../../../schema/applyJobs';
import { applyJobs } from '../../../store/reducers/applyJobs/applyJobs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';

const JobDescription = () => {

  const [isApplyJobsOpen, setIsApplyJobsOpen] = useState(false);
  const [checkEmpty, isCheckEmpty] = useState(true);
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState<Date | null>(null);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { success, jobDetail } = useAppSelector((state) => state.getJobDetail);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IFormApplyJobsWithoutQuestionnaire>({
    resolver: yupResolver(applyJobsSchema) as any,
  });


  const onSubmit = (data: IFormApplyJobsWithoutQuestionnaire) => {
    console.log("data", id);
    const userId = Cookies.get("userId");
    const selectedQuestionnaireAnswer: any = [];
    const selectedMultipleChoiceQuestionnaireAnswer: any = [];

    dispatch(applyJobs({
      "user": userId && parseInt(userId),
      "jobs": id && parseInt(id),
      "questionnaireAnswer": selectedQuestionnaireAnswer,
      "multipleChoiceQuestionnaireAnswer": selectedMultipleChoiceQuestionnaireAnswer
    })).then((data: any) => {

      console.log("payload", data);

      if (data?.payload?.count > 0) {
        toast.info("job already applied !!")
      } else {
        toast.success("job Applied successfully !!")
      }
      // closeDialog(true);
    });
  }

  useEffect(() => {
    dispatch(getJobDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
    }
  }, [success, dispatch]);

  const parsedDate = parseISO(jobDetail?.createdAt)
  useEffect(() => {
    if (!isNaN(parsedDate.getDate())) {
      setLastUpdatedTimestamp(parsedDate);
    }

    jobDetail?.questionnaire?.map(item => {
      if (item.question === '') {
        isCheckEmpty(false)
      }
    })
  }, [jobDetail]);

  const locationCount = jobDetail?.company?.location?.length;

  const applyJobsAction = () => {
    setIsApplyJobsOpen(true);
  }

  const closeDialog = () => {
    setIsApplyJobsOpen(false);
  };

  console.log("errors", Cookies.get("userId"));



  return (
    <Fragment>
      <div className="h-[10%] w-full"></div>
      <div className="grid grid-cols-12 gap-10 py-6 px-32 bg-[#F8FAFC] ">
        <div className="col-start-1 col-end-8  p-5">
          <div className="border border-[#E0E7FF] rounded-xl p-5 bg-white">
            <div className="self-stretch h-44 flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                  <div className="self-stretch text-slate-900 text-2xl font-bold  leading-7 tracking-tight">{jobDetail?.title}</div>
                  <div className="self-stretch justify-start items-start gap-1 inline-flex">
                    <div className="grow shrink basis-0 text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.title}</div>
                    <span className="text-slate-400 text-sm font-normal  leading-none tracking-tight">
                      {lastUpdatedTimestamp !== null && formatDistanceToNow(lastUpdatedTimestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px border border-indigo-100"></div>
              <div className="self-stretch h-16 flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-start items-start gap-5 inline-flex">
                  <div className="justify-start items-center gap-2 flex">
                    <img src={experienceIcon} alt="experience" />
                    <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      {jobDetail?.totalExpYearStart?.title[0]} -
                    </span>
                    <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      {jobDetail?.totalExpYearEnd?.title[0]} Years
                    </span>
                  </div>
                  {!jobDetail?.hideSalaryDetails && <div className="justify-start items-center gap-2 flex">
                    <img src={moneyIcon} alt="moneyIcon" />
                    <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                      {jobDetail?.payScaleLowerRange?.title} -
                    </span>
                    {jobDetail?.payScaleUpperRange &&
                      <span className=" text-slate-500 text-base font-medium leading-snug tracking-tight"> {jobDetail?.payScaleUpperRange?.title}  {jobDetail?.numberSystem?.title} {jobDetail?.recurrence?.title}
                      </span>}
                  </div>}
                  <div className="justify-start items-center gap-2 flex">
                    <img src={locationIcon} alt="location" />
                    {jobDetail?.jobsLocation?.map((loc: any) =>
                      <span className="text-slate-500 text-base font-medium leading-snug tracking-tight">
                        {loc?.location?.title},
                      </span>)}
                  </div>
                </div>
                <div className="justify-start items-center gap-5 inline-flex">
                  {jobDetail?.workMode?.title && <div className=" px-3 py-2 bg-orange-50 rounded justify-center items-center gap-2.5 flex">
                    <div className="text-orange-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.workMode?.title}</div>
                  </div>}
                  {jobDetail?.employmentType?.title && <div className=" px-3 py-2 bg-green-50 rounded justify-center items-center gap-2.5 flex">
                    <div className="text-green-600 text-sm font-normal leading-none tracking-tight">{jobDetail?.employmentType?.title}</div>
                  </div>}
                </div>
              </div>
            </div>
            <div className="justify-start items-center gap-5 inline-flex mt-4">
              {checkEmpty && <button className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" onClick={applyJobsAction}>
                <span className="text-white text-xl font-medium  leading-normal tracking-tight">Apply</span>
              </button>}
              {!checkEmpty && <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <button type='submit' className="w-48  px-6 py-1.5 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex" >
                    <span className="text-white text-xl font-medium  leading-normal tracking-tight">Apply</span>
                  </button>
                </form>
              </>}
              <button className="w-28 pl-6 pr-3 py-1.5 bg-indigo-50 rounded-lg justify-center items-center  gap-3 flex">
                <span className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight ">Save</span>
                <span>
                  <img src={bookMarkIcon} alt="bookMark" />
                </span>
              </button>
            </div>
          </div>
          <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4 bg-white " >
            <div className="  flex-col justify-start items-start gap-5 flex-wrap">
              <div className=" text-slate-900 text-base font-bold leading-snug tracking-tight">Job Description
              </div>
              <div className=" w-full  text-slate-500 text-base font-medium  leading-snug tracking-tight flex flex-wrap mb-2">
                <p className="w-full break-words"> {jobDetail?.jobDescription}</p>
              </div>
            </div>
            <div className="self-stretch h-px border border-indigo-100 my-5"></div>
            <div className="self-stretch flex-col justify-start items-start gap-5 flex">
              <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">
                Key Responsibilities</div>
              <span className="w-full break-words text-slate-500 text-base font-medium leading-snug tracking-tight">
                {jobDetail?.keyResponsibility}
              </span>
            </div>
            <div className="self-stretch h-px border border-indigo-100 my-5"></div>
            <div className="self-stretch  flex-col justify-start items-start gap-5 flex ">
              <div className="self-stretch text-slate-900 text-base font-bold  leading-snug tracking-tight">Skills</div>
              <div className=" justify-start items-start gap-3 flex-row flex flex-wrap">
                {jobDetail?.jobsKeySkills?.map((keySkill) =>
                  <div className=" px-3 py-2 bg-slate-50 rounded-lg justify-center items-center gap-2.5 flex">
                    <span className="text-black text-base font-normal  leading-snug tracking-tight">{keySkill?.keySkills?.title}</span>
                  </div>)}
              </div>
            </div>
          </div>
          <div className="border border-[#E0E7FF] rounded-xl p-5 mt-4 bg-white">
            <span className="self-stretch text-slate-900 text-base font-bold leading-snug tracking-tight">About the company
            </span>
            <div className="self-stretch justify-start items-center gap-3 flex mt-2">
              <img className="w-14 h-14 rounded-lg" src={companyLogo} alt="companyLogo" />
              <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
                <div className="self-stretch text-slate-900 text-2xl font-bold leading-7 tracking-tight overflow-hidden whitespace-nowrap text-ellipsis w-96">{jobDetail?.company?.title}</div>
                <div className="w-40 justify-start items-center gap-2 inline-flex">
                  <div className="justify-start items-center gap-1 flex">
                    <AiFillStar color="yellow" />
                    {jobDetail?.company?.rating ? <div className="text-black text-sm font-normal leading-none tracking-tight">{jobDetail?.company?.rating}</div> : <div >N.A</div>}
                  </div>
                  {jobDetail?.company?.reviews && <Fragment>
                    <div className=" border-l border-indigo-100 h-4"></div>
                    <div className="text-slate-500 text-sm font-normal leading-none tracking-tight">{jobDetail?.company?.reviews}
                    </div>
                  </Fragment>}
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-5 inline-flex mt-2">
              <div className="justify-start items-center gap-2 flex">
                <img src={locationIcon} alt="location" />
                {jobDetail?.company?.location?.length > 0 ? jobDetail?.company?.location?.map((loc, index) =>
                  (index < locationCount) ? <span className="ml-1 text-slate-500 text-base font-medium">{loc?.title}, </span>
                    : <span className="ml-1 text-base font-medium text-slate-500">{loc?.title}. </span>
                ) : <span className="ml-1 text-slate-500 text-base font-medium">N.A</span>}
              </div>
              <div className=" border-l border-indigo-100 h-4"></div>
              {jobDetail?.company?.employeeCount && <div className="justify-start items-center gap-2 flex">
                <img src={peopleIcon} alt="people" />
                <div className="text-slate-500 text-base font-medium leading-snug tracking-tight">{jobDetail?.company?.employeeCount}
                </div>
              </div>
              }
            </div>
            <div className="px-2 py-1.5  w-44 bg-indigo-50 rounded-lg justify-center items-center text-center mt-2">
              <button className="text-indigo-900 text-base font-medium  leading-snug tracking-tight ">More open positions</button>
            </div>
          </div>
        </div>
        <div className="col-start-8 col-end-13">
          <div className="flex flex-row justify-between items-center mb-5">
            <span className="font-bold text-xl">Similar Jobs</span>
            <Link to="/allJobs" className="flex justify-center items-center">
              <div className="flex flex-row items-center">
                <span className="flex justify-center items-center text-lg font text-indigo-900 text-center mr-1">
                  All Jobs
                </span>
                <img src={rightArrow} alt="rightArrow" width="w-full" className="text-indigo-900" />
              </div>
            </Link>

          </div>
          <div className="mb-4"><ShortJobCard /></div>
          <div className=" mb-3"><ShortJobCard /></div>
          <div className=" mb-3"><ShortJobCard /></div>
        </div>
      </div >

      <Modal
        title={"Apply Now"}
        isOpen={isApplyJobsOpen}
        setIsOpen={setIsApplyJobsOpen}
        modalBody={
          <ApplyJobs
            questionnaire={jobDetail?.questionnaire} closeDialog={closeDialog} />
        }
      />
      <ToastContainer />
    </Fragment>
  )
}

export default JobDescription;