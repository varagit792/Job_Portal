import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import JobLeftPanel from './JobLeftPanel'
import { IFormInputsCompany } from '../../../../interface/employer';
import AutocompleteBox from '../../../commonComponents/AutocompleteBox';
import GetJobDetails, { clearGetJobDetailSlice, getJobDetail } from '../../../../store/reducers/jobs/GetJobDetails';
import star from '../../../../assets/svg/star.svg';
import { getCompanyList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanySchema } from '../../../../schema/postJob';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData } from '../../../../store/reducers/jobs/postJobs';
import { getAllCompanies } from '../../../../store/reducers/companies/getAllCompanies';

const Company = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>([]);
  const { formData: jobDetailData } = useAppSelector((state) => state.updatePostJobUpdate);
  const { success: jobDetailSuccess, jobDetail } = useAppSelector((state) => state.getJobDetail);
  const [postBack, setPostBack] = useState({ postURL: '', backURL: '' });
  const [jobTitle, setJobTitle] = useState('');
  const { success, allCompanies } = useAppSelector((state) => state.getAllCompanies);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<IFormInputsCompany>({
    resolver: yupResolver(CompanySchema),
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

  const onSubmit = (data: IFormInputsCompany) => {

    dispatch(formData({
      company: data.companyName,
      hideCompanyRating: data?.hideCompanyRating,
      companyWebsite: data?.companyWebsite,
      aboutCompany: data?.aboutCompany,
      companyAddress: data?.companyAddress,

    }));
    navigate(postBack?.postURL);
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
      setPostBack({ postURL: `/postJob/recruiter/${postId}`, backURL: `/postJob/requirements/${postId}` });
      setJobTitle(jobDetail?.title);
    } else {
      setPostBack({ postURL: '/postJob/recruiter', backURL: '/postJob/requirements' })
    }
  }, []);
  useEffect(() => {
    dispatch(getAllCompanies({} as any));
  }, [dispatch])

  useEffect(() => {
    setCompany(allCompanies as any)
  }, [success])

  const watchKeyAboutCompany = watch('aboutCompany')?.length;
  const watchCompanyAddress = watch('companyAddress')?.length;

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-auto flex-col justify-start  gap-10 inline-flex">
                  <div className="flex-col justify-start  gap-10 flex">
                    <div className="text-black text-xl font-medium  leading-normal tracking-tight">Company</div>
                    <div className="justify-start items-center gap-2 inline-flex">
                      <div className="w-6 h-6 relative">
                        <input type="checkbox"
                          {...register("fillCompanyInformation")}
                          defaultChecked={true}
                          className=" w-4 h-4" />
                      </div>
                      <div className="text-black text-base font-normal  leading-snug tracking-tight">Fill saved company information</div>
                    </div>
                    <div className="flex-col justify-start  gap-7 flex">
                      <div className="flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company logo</div>
                        <div className="justify-start  inline-flex">
                          <div className="w-[120px] h-[120px] p-3 rounded-lg border border-indigo-300 flex-col justify-center items-center gap-2 inline-flex">
                            <div className="w-6 h-6 flex-col justify-center items-center flex"></div>
                            <div className="self-stretch justify-start  gap-5 inline-flex">
                              <div className="grow shrink basis-0 self-stretch justify-center items-center gap-1 flex">
                                <div className="grow shrink basis-0 text-center text-slate-400 text-xs font-normal  leading-[14.40px] tracking-tight">Formats: .png and .jpg</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch justify-start  gap-5 inline-flex">
                        <div className="w-full grow shrink basis-0 flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company name</div>
                          <div className='w-full'>
                            <AutocompleteBox
                              control={control}
                              isClearable={true}
                              fieldName={"companyName"}
                              dropdownData={company?.map(({ id, title }: any) => ({ value: id, label: title } as any))}
                              placeholder={"Select company"}
                              defaultValue={watch("companyName")}
                            />
                            {errors?.companyName && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyName?.label?.message}</p>}
                          </div>
                        </div>
                        <div className="w-full grow shrink basis-0  flex-col justify-start  gap-2 inline-flex">
                          <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Website</div>
                          <div className='w-full'>
                            <input defaultValue={''}
                              className='w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                              placeholder={"Please enter company website"}
                              {...register("companyWebsite")} />
                            {errors?.companyWebsite && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyWebsite?.message}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-auto flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">About Company</div>
                        <div className='w-full'>
                          <textarea defaultValue={''}
                            className='w-full h-[75px] border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Please enter about company"}
                            {...register("aboutCompany")} ></textarea>

                          {errors?.aboutCompany && <p className="font-normal text-xs text-red-500 absolute">{errors?.aboutCompany?.message}</p>}
                        </div>
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchKeyAboutCompany ? 1000 - watchKeyAboutCompany : 1000} character(s) left
                        </div>
                      </div>
                      <div className="w-full h-auto flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Company Address</div>
                        <div className='w-full'>
                          <textarea defaultValue={''}
                            className='w-full border h-[75px] border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5'
                            placeholder={"Please enter company address"}
                            {...register("companyAddress")} ></textarea>
                          {errors?.companyAddress && <p className="font-normal text-xs text-red-500 absolute">{errors?.companyAddress?.message}</p>}
                        </div>
                        <div className="w-full text-xs font-light text-gray-600 text-right float-right">
                          {watchCompanyAddress ? 1000 - watchCompanyAddress : 1000} character(s) left
                        </div>
                      </div>
                      <div className="flex-col justify-start  gap-2 flex">
                        <div className="text-slate-700 text-sm font-normal  leading-[16.80px] tracking-tight">Rating</div>
                        <div className="justify-start items-center gap-5 inline-flex">
                          <div className="w-[177px] p-3 bg-white rounded-lg justify-start items-center gap-2 flex">
                            <div className="justify-start items-center gap-1 flex">
                              <div className="w-6 h-6 justify-center items-center flex"><img src={star} alt='star' /></div>
                              <div className="text-black text-sm font-normal  leading-[16.80px] tracking-tight">3.5</div>
                            </div>
                            <div className="w-0.5 self-stretch origin-top-left  border border-indigo-100"></div>
                            <div className="text-slate-500 text-sm font-normal  leading-[16.80px] tracking-tight">5k+ Reviews</div>
                          </div>
                          <div className="justify-start items-center gap-2 flex">
                            <div className="w-6 h-6 relative">
                              <input type="checkbox"
                                {...register("hideCompanyRating")}
                                defaultChecked={true}
                                className=" w-4 h-4" />
                              {errors?.hideCompanyRating && <p className="font-normal text-xs text-red-500 absolute">{errors?.hideCompanyRating?.message}</p>}
                            </div>
                            <div className="text-slate-400 text-sm font-normal  leading-[16.80px] tracking-tight">Hide company rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch justify-start  gap-5 inline-flex">
                    <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer" onClick={() => returnBack(postBack.backURL)}>
                      <div className="w-6 h-6 justify-center items-center flex"></div>
                      <div className="text-indigo-900 text-xl font-medium  leading-normal tracking-tight">Back</div>
                    </div>
                    {Number(postId) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <div className="text-indigo-900 text-xl font-medium leading-normal tracking-tight ">Save</div>
                    </div>}
                    {!Number(postId) && <div className="grow shrink basis-0 h-14 pl-3 pr-6 py-3 bg-indigo-50 rounded-lg justify-center items-center gap-3 flex cursor-pointer">
                      <div className="text-indigo-900 text-xl font-medium leading-normal tracking-tight ">Save as Draft</div>
                    </div>}
                    <div className="grow shrink basis-0 h-14 px-6 py-3 bg-indigo-600 rounded-lg shadow justify-center items-center gap-3 flex">
                      <input className="text-white text-xl font-medium leading-normal tracking-tight cursor-pointer" type="submit" value={'Continue'} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Company