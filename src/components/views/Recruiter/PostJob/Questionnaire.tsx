import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsCompany, IFormInputsCompanyDraft, IFormInputsCompanySave } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import GetJobDetails, { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import star from '../../../../assets/svg/star.svg';
import { getCompanyList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyDraftSchema, CompanySaveSchema, CompanySchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData, postCompanyDraft, postCompanySave } from '../../../../store/reducers/jobs/postJobs';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import Toaster from '../../../commonComponents/Toaster';
import Cookies from 'js-cookie';
import Modal from '../../../commonComponents/Modal';
import QuestionnaireForm from './QuestionnaireForm';

const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>([]);
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [jobTitle, setJobTitle] = useState('');
  const [buttonClick, setButtonClick] = useState('');
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [userType, setUserType] = useState(Cookies.get('userType'));
  const [userId, setUserId] = useState(Cookies.get('userId'));
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsCompany | IFormInputsCompanyDraft | IFormInputsCompanySave>({
    // resolver: yupResolver(CompanySchema || CompanyDraftSchema || CompanySaveSchema),
  });

  useEffect(() => {

    if (Object.keys(jobDetail).length !== 0) {
      jobDetail?.company && setValue('companyName', { label: jobDetail?.company?.title, value: jobDetail?.company?.id?.toString() });
      jobDetail?.companyWebsite && setValue('companyWebsite', jobDetail?.companyWebsite);
      jobDetail?.aboutCompany && setValue('aboutCompany', jobDetail?.aboutCompany);
      jobDetail?.hideCompanyRating && setValue('hideCompanyRating', jobDetail?.hideCompanyRating);
      jobDetail?.companyAddress && setValue('companyAddress', jobDetail?.companyAddress);
    } else {
      jobDetailData?.company && setValue('companyName', jobDetailData?.company);
      jobDetailData?.companyWebsite && setValue('companyWebsite', jobDetailData?.companyWebsite);
      jobDetailData?.aboutCompany && setValue('aboutCompany', jobDetailData?.aboutCompany);
      jobDetailData?.hideCompanyRating && setValue('hideCompanyRating', jobDetailData?.hideCompanyRating);
      jobDetailData?.companyAddress && setValue('companyAddress', jobDetailData?.companyAddress);
    }
  }, [setValue, jobDetail, jobDetailData]);
  const onSubmit = (data: IFormInputsCompany | IFormInputsCompanyDraft | IFormInputsCompanySave) => {

    const updatePostId = postId ? Number(postId) : null;

    if (buttonClick === 'Continue') {

      navigate(postBack?.postURL);
    }


  }

  useEffect(() => {
    if (Number(postId)) {
      dispatch(getJobDetail(postId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (jobDetailSuccess)
      dispatch(clearGetJobDetailSlice());
  }, [dispatch, jobDetailSuccess]);

  useEffect(() => {
    (async () => {
      const companyList = await getCompanyList()
      if (Object.keys(companyList)?.length) {
        setCompany(companyList as any)
      }
    })();

    if (Number(postId)) {
      setPostBack({ postURL: `/postJob/response/${postId}`, backURL: `/postJob/recruiter/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/response', backURL: '/postJob/recruiter' })
    }
  }, []);
  useEffect(() => {
    dispatch(getAllCompanies({} as any));
  }, [dispatch])

  useEffect(() => {
    setCompany(allCompanies as any)
  }, [success])

  useEffect(() => {
    setUserType(Cookies.get('userType'));
    setUserId(Cookies.get('userId'));
  }, [Cookies])



  const returnBack = (returnURL: string) => {
    navigate(returnURL);
  }
  const closeProfilePictureDialog = () => setIsQuestionnaireOpen(false);

  return (
    <>
      <div className="h-[10%] w-full"></div>
      <div className="bg-[#F8FAFC] font-sans px-32 py-10">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-start-1 col-end-4">
            <JobLeftPanel jobTitle={jobTitle} />
          </div>
          <div className="col-start-4 col-end-11">
            <div id="jobDetails" className="scroll-mt-24 scroll-smooth">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                  <div className="flex-col justify-start  gap-3 flex">
                    <div className="text-black text-xl font-medium  leading-normal tracking-tight">Questionnaire</div>
                    <div className="justify-start items-center gap-2 inline-flex">

                      <div className="text-black text-base font-normal mb-5 leading-snug tracking-tight">Create a questionnaire that candidates fill while applying the job</div>
                    </div>

                    <div className="w-[50%] grow shrink basis-0 border-dotted border-2 border-indigo-500 h-14 px-6 py-3 bg-white-600 rounded-lg shadow justify-left items-center gap-3 flex">
                      <button className="text-slate-500 font-medium leading-normal tracking-tight cursor-pointer">+ What is notice period of your current company</button>
                    </div>

                    <div className="w-[20%] grow shrink basis-0 border-dashed rounded-full border-2 border-indigo-500 h-14 px-6 py-3 bg-white-600 shadow justify-left justify-center items-center gap-3 flex">
                      <button className="text-slate-500 font-medium leading-normal tracking-tight cursor-pointer" onClick={() => setIsQuestionnaireOpen(true)}>+ Add questions</button>
                    </div>

                  </div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>
                      <div className="w-6 h-6 justify-center items-center flex"></div>
                      <div className="text-indigo-900 font-medium  leading-normal tracking-tight">Back</div>
                    </div>
                    {!isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save'} onClick={() => setButtonClick('Save')} />
                    </div>}
                    {isNaN(Number(postId)) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <input className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer" type="submit" name='SaveAsDraft' value={'Save as Draft'} onClick={() => setButtonClick('Draft')} />
                    </div>}
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <input className="text-white font-medium leading-normal tracking-tight cursor-pointer" type="submit" value={'Continue'} onClick={() => setButtonClick('Continue')} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
      <Modal
        isOpen={isQuestionnaireOpen}
        setIsOpen={setIsQuestionnaireOpen}
        modalBody={
          <QuestionnaireForm closeDialog={closeProfilePictureDialog}
            setIsQuestionnaireOpen={setIsQuestionnaireOpen}
          />
        }
      />
    </>
  )
}

export default Questionnaire