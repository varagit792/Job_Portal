import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsCompany, IFormInputsCompanyDraft, IFormInputsCompanySave } from '../../../../interface/employer';
import { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import { getCompanyList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';
import Cookies from 'js-cookie';
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
              <div className="w-full h-auto flex-col justify-start items-start gap-10 inline-flex">
                <div className="justify-start items-center gap-2 inline-flex">
                  <div className="text-black text-2xl font-medium  leading-[28.80px] tracking-tight">Questionnaire</div>
                  <div className="text-slate-500 text-base font-normal  leading-snug tracking-tight">(optional)</div>
                </div>
                <QuestionnaireForm />
              </div>
              <div className="w-full h-auto flex-col justify-start mt-10  gap-10 inline-flex">

                <div className="self-stretch justify-start  gap-5 inline-flex">
                  {/* <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>
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
                    <input className="text-white font-medium leading-normal tracking-tight cursor-pointer" type="submit" value={'Continue'}
                      //onClick={() => setButtonClick('Continue')}
                      onClick={() => navigate(postBack?.postURL)}
                    />
                  </div> */}
                  <button name='Back' className="text-indigo-900 font-medium leading-normal tracking-tight grow shrink basis-0 h-14 px-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>Back</button>

                  {!isNaN(Number(postId)) &&
                    <button name='Save' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex" onClick={() => setButtonClick('Save')}>Save</button>
                  }

                  {isNaN(Number(postId)) &&
                    <button name='SaveAsDraft' className="text-indigo-900 font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex " onClick={() => setButtonClick('Draft')}>Save as Draft</button>
                  }

                  <button type="submit" name='Continue' className="text-white font-medium leading-normal tracking-tight cursor-pointer grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex"
                    //onClick={() => setButtonClick('Continue')}                  
                  onClick={() => navigate(postBack?.postURL)}>Continue</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Questionnaire