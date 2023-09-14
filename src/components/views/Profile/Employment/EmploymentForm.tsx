import React, { useEffect, useState } from 'react'
import { getCompanyList, getCourseList, getCurrencyList, getDepartmentList, getEducationTypeList, getInstituteList, getJoiningDateMonthList, getJoiningDateYearList, getLocationList, getNoticePeriodList, getPassOutYearList, getTotalMonthsExpList, getTotalYearsExpList, getjobTitleList } from '../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../..';
import { jobSeekerEducationAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import { jobSeekerEmploymentAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEmploymentAdd';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { keySkillsGet } from '../../../../store/reducers/dropdown/keySkills';
import { filterArray } from '../../../utils/filterArray';
//import { number } from 'yup';

// interface IFormInputs {
//   keySkills: string;

// }

const currentEmployment = ['Yes', 'No'];
const employmentType = ['Full Time', 'Internship'];

interface IFormInputs {
    id: number
    currentEmployment: string
    employmentType: string
    totalExpYears: any
    totalExpMonths:any
    currentCompanyName: any
    currentDesignation: any
    joiningDateYear: any
    joiningDateMonth: any
    currentSalType: any
    currentSalary: number
    skillsUsed: any
    jobProfile: string
    noticePeriod: any
    previousCompanyName: any    
    previousDesignation: any
    workedTillYear: any
    workedTillMonth: any
    location: any    
    department: any
    workedFromYear: any
    workedFromMonth: any
    monthlyStipend: number
}

export default function ({ closeDialog, educationDetails, selectedEmployment, isEdit }: any) {
  const [courses, setCourses] = useState([]);
  const [eductionType, setEducationType] = useState([]);
  const [experienceYears, setExperienceYears] = useState<any>([]);
  const [experienceMonths, setExperienceMonths] = useState<any>([]);
  const [joiningDateYear, setJoiningDateYear] = useState<any>([]);
  const [joiningDateMonth, setJoiningDateMonth] = useState<any>([]);
  const [skillsUsed, setSkillsUsed] = useState<any>([]);
  const [currentCompany, setCurrentCompany] = useState<any>([]);
  const [designation, setDesignation] = useState<any>([]);
  const [locationList, setLocationList] = useState<any>([]);
  const [department, setDepartment] = useState<any>([]);
  const [currency, setCurrency] = useState<any>([]);
  const [noticePeriod, setNoticePeriod] = useState<any>([]);
  const [institute, setInstitute] = useState([]);
  const [passOutYear, setPassOutYear] = useState([]);
  const [educationData, setEducationData] = useState({
    id: selectedEmployment?.id && selectedEmployment?.id,
    courseType: selectedEmployment?.courseType ? selectedEmployment?.courseType : '',
    education: selectedEmployment?.education ? selectedEmployment?.education : '',
    institute: selectedEmployment?.institute ? selectedEmployment?.institute : '',
    passingYear: selectedEmployment?.passingYear ? selectedEmployment?.passingYear : '',
    percentage: selectedEmployment?.percentage ? selectedEmployment?.percentage : '',
    specialization: selectedEmployment?.specialization ? selectedEmployment?.specialization : ''
  })
  const [employmentData, setEmploymentData] = useState({
    id: selectedEmployment?.id && selectedEmployment?.id,
    currentEmployment: selectedEmployment?.isCurrentEmployment && selectedEmployment?.isCurrentEmployment === true ? 'Yes' : 'No',
    employmentType: selectedEmployment?.employmentType ? selectedEmployment?.employmentType : '',
    totalExpYears: selectedEmployment?.totalExpYearsId ? selectedEmployment?.totalExpYearsId : '',
    totalExpMonths: selectedEmployment?.totalExpMonthsId ? selectedEmployment?.totalExpMonthsId : '',
    currentCompanyName: selectedEmployment?.companyName ? selectedEmployment?.companyName : '',
    currentDesignation: selectedEmployment?.designation ? selectedEmployment?.designation : '',
    joiningDateYear: selectedEmployment?.joiningDateYear ? selectedEmployment?.joiningDateYear : null,
    joiningDateMonth: selectedEmployment?.joiningDateMonth ? selectedEmployment?.joiningDateMonth : null,
    currentSalType: selectedEmployment?.currencyTypeId ? selectedEmployment?.currencyTypeId : '',
    currentSalary: selectedEmployment?.currentSalary ? selectedEmployment?.currentSalary : null,
    skillsUsed: selectedEmployment?.jobSeekerProfileEmploymentSkills ? selectedEmployment?.jobSeekerProfileEmploymentSkills : '',
    jobProfile: selectedEmployment?.jobProfile ? selectedEmployment?.jobProfile : '',
    noticePeriod: selectedEmployment?.noticePeriodId ? selectedEmployment?.noticePeriodId : '',
    previousCompanyName: selectedEmployment?.companyName ? selectedEmployment?.companyName : '',    
    previousDesignation: selectedEmployment?.designation ? selectedEmployment?.designation : '',
    workedTillYear: selectedEmployment?.workedTillYear ? selectedEmployment?.workedTillYear : '',
    workedTillMonth: selectedEmployment?.workedTillMonth ? selectedEmployment?.workedTillMonth : '',
    location: selectedEmployment?.locationId ? selectedEmployment?.locationId : '',     
    department: selectedEmployment?.departmentId ? selectedEmployment?.departmentId : '',
    workedFromYear: selectedEmployment?.joiningDateYear ? selectedEmployment?.joiningDateYear : null,
    workedFromMonth: selectedEmployment?.joiningDateMonth ? selectedEmployment?.joiningDateMonth : null,
    monthlyStipend: selectedEmployment?.monthlyStipend ? selectedEmployment?.monthlyStipend : null,
  })

  const dispatch = useAppDispatch();

  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);
  const { success: keySkillsSuccess, keySkills  } = useAppSelector((state) => state.getKeySkills);

  const id = profileDashboard?.id;
  
  console.log("profileDashboard-->", profileDashboard);
  console.log("selectedEmployment-->", selectedEmployment);
  


  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<IFormInputs>({
    defaultValues: {
      id: profileDashboard?.id && profileDashboard?.id,
      currentEmployment: selectedEmployment?.isCurrentEmployment && selectedEmployment?.isCurrentEmployment === true ? 'Yes' :(selectedEmployment?.isCurrentEmployment === false ? 'No' : ''),
      employmentType: selectedEmployment?.employmentType ? selectedEmployment?.employmentType : '',
      totalExpYears: selectedEmployment?.totalExpYears
        ? { value: selectedEmployment?.totalExpYears?.id, label: selectedEmployment?.totalExpYears?.title }
        : '',
      totalExpMonths: selectedEmployment?.totalExpMonths
        ? { value: selectedEmployment?.totalExpMonths?.id, label: selectedEmployment?.totalExpMonths?.title }
        : '',
      currentCompanyName: selectedEmployment?.companyName
        ? { value: currentCompany?.filter(({ id, title }: any) => title === selectedEmployment?.companyName && id), label: selectedEmployment?.companyName }
        : '',
      currentDesignation: selectedEmployment?.designation
        //? selectedEmployment?.designation : '',
        ? { value: designation?.filter(({ id, title }: any) => title === selectedEmployment?.designation && id), label: selectedEmployment?.designation }
        : '',
      joiningDateYear: selectedEmployment?.joiningDateYear
        //? selectedEmployment?.joiningDateYear : null,
        ? { value: selectedEmployment?.joiningDateYear?.id, label: selectedEmployment?.joiningDateYear?.title }
        : null,
      joiningDateMonth: selectedEmployment?.joiningDateMonth
        //? selectedEmployment?.joiningDateMonth : null,
        ? { value: selectedEmployment?.joiningDateMonth?.id, label: selectedEmployment?.joiningDateMonth?.title }
        : null,
      currentSalType: selectedEmployment?.currencyType
        //? selectedEmployment?.currencyType : '',
        ? { value: selectedEmployment?.currencyType?.id, label: selectedEmployment?.currencyType?.title }
        : '',
      currentSalary: selectedEmployment?.currentSalary ? selectedEmployment?.currentSalary : null,
      skillsUsed: selectedEmployment?.jobSeekerProfileEmploymentSkills
        //? selectedEmployment?.jobSeekerProfileEmploymentSkills : '',
        ? { value: selectedEmployment?.jobSeekerProfileEmploymentSkills?.[0]?.keySkills?.id, label: selectedEmployment?.jobSeekerProfileEmploymentSkills?.[0]?.keySkills?.title }
        : '',
      jobProfile: selectedEmployment?.jobProfile ? selectedEmployment?.jobProfile : '',
      noticePeriod: selectedEmployment?.noticePeriod
        //? selectedEmployment?.noticePeriod : '',
        ? { value: selectedEmployment?.noticePeriod?.id, label: selectedEmployment?.noticePeriod?.title }
        : '',
      previousCompanyName: selectedEmployment?.companyName ? selectedEmployment?.companyName : '',    
      previousDesignation: selectedEmployment?.designation ? selectedEmployment?.designation : '',
      workedTillYear: selectedEmployment?.workedTillYear ? selectedEmployment?.workedTillYear : '',
      workedTillMonth: selectedEmployment?.workedTillMonth ? selectedEmployment?.workedTillMonth : '',
      location: selectedEmployment?.locationId ? selectedEmployment?.locationId : '',     
      department: selectedEmployment?.departmentId ? selectedEmployment?.departmentId : '',
      workedFromYear: selectedEmployment?.joiningDateYear ? selectedEmployment?.joiningDateYear : null,
      workedFromMonth: selectedEmployment?.joiningDateMonth ? selectedEmployment?.joiningDateMonth : null,
      monthlyStipend: selectedEmployment?.monthlyStipend ? selectedEmployment?.monthlyStipend : null,
     }
  });

  // const {
  //   //register,
  //   handleSubmit,
  //   //formState: { errors }
  // } = useForm<IFormInputs>({
  //   //resolver: yupResolver(ResumeSchema)
  // });

  useEffect(() => {
    dispatch(keySkillsGet());
  }, [dispatch]);

  useEffect(() => {
    setSkillsUsed(keySkills as any)
  }, [keySkills])
  
  useEffect(() => {
    (async () => {
      const courseList = await getCourseList()
      setCourses(courseList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const companyList = await getCompanyList()
      setCurrentCompany(companyList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const currentDesignationList = await getjobTitleList()
      setDesignation(currentDesignationList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const departmentList = await getDepartmentList()
      setDepartment(departmentList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const locationList = await getLocationList()
      setLocationList(locationList as any)
    })();
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     const eductionTypeList = await getEducationTypeList()
  //     console.log("educationDetails-->", educationDetails);
  //     const coursesString = [] as any
  //     if (Object.keys(educationDetails).length && !Object.keys(selectedEmployment).length && !isEdit) {
  //       educationDetails.map((item: any) => {
  //         coursesString.push(item.education)
  //         const filteredCourses = eductionTypeList.filter((item1: any) => !coursesString.includes(item1.title))
  //         console.log("filteredCourses-->", filteredCourses);
  //         setEducationType(filteredCourses as any)
  //       })
  //     } else {
  //       setEducationType(eductionTypeList as any)
  //     }
  //   })();
  // }, [])

  useEffect(() => {
    (async () => {
      const experienceYearsList = await getTotalYearsExpList()
      if (Object.keys(experienceYearsList).length) {
        setExperienceYears(experienceYearsList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const experienceMonthsList = await getTotalMonthsExpList()
      if (Object.keys(experienceMonthsList).length) {
        setExperienceMonths(experienceMonthsList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const joiningDateYearList = await getJoiningDateYearList()
      if (Object.keys(joiningDateYearList).length) {
        setJoiningDateYear(joiningDateYearList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const joiningDateMonthList = await getJoiningDateMonthList()
      if (Object.keys(joiningDateMonthList).length) {
        setJoiningDateMonth(joiningDateMonthList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const currencyList = await getCurrencyList()
      if (Object.keys(currencyList).length) {
        setCurrency(currencyList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const noticePeriodList = await getNoticePeriodList()
      if (Object.keys(noticePeriodList).length) {
        setNoticePeriod(noticePeriodList as any)
      }
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const instituteList = await getInstituteList()
      setInstitute(instituteList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const passOutYearList = await getPassOutYearList()
      setPassOutYear(passOutYearList as any)
    })();
  }, [])

  const handleChange = (event: any) => {
    const { name, value, id, checked } = event.target;
    console.log("name and value-->", event, id, checked, name, value);
    if (name === "currentEmployment" || name === "employmentType") {
      setEmploymentData({ ...employmentData, [name]: id as any })
    } else {
      setEmploymentData({ ...employmentData, [name]: value as any })
    }
  }

  console.log('watch default', watch('currentEmployment'))
  console.log('watch default', watch('employmentType'))
  
  // OnSubmit button
  const onSubmit = (data: IFormInputs) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'June', 'July', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    console.log("data-->", data)
    //const joiningDateMonthArray = data?.joiningDateMonth?.value;


    //let empData = {};
    const empData:any = { 
      //...(data?.id && { id: data?.id }),
      id:selectedEmployment?.id ? selectedEmployment?.id : null,
      jobSeekerProfile:id,
      isCurrentEmployment: data.currentEmployment === "Yes" ? true : false,
      employmentType: data.employmentType,
      totalExpYears: data.totalExpYears.value,
      totalExpMonths: data.totalExpMonths.value,
      companyName: data.currentCompanyName ? data?.currentCompanyName?.label : data.previousCompanyName?.label,
      designation: data.currentDesignation ? data.currentDesignation?.label : data.previousDesignation?.label,
      joiningDateYear: data.joiningDateYear ? data.joiningDateYear?.value : data.workedFromYear?.value,
      joiningDateMonth: data.joiningDateMonth ? (data.joiningDateMonth?.value as any) : (data.workedFromMonth?.value as any),
      currencyType: data.currentSalType?.value,
      currentSalary: data.currentSalary,
      jobSeekerProfileEmploymentSkills: [data?.skillsUsed?.value],
      jobProfile: data.jobProfile,
      noticePeriod: data.noticePeriod?.value,      
    //previousCompanyName: data.companyName,    
    //previousDesignation: data.designation,
    workedTillYear: data.workedTillYear ? (data.workedTillYear?.value as any) : null,
    workedTillMonth: data.workedTillMonth ? (data.workedTillMonth?.value as any) : null,
    location: data.location?.value,     
    department: data.department?.value,
    //joiningDateYear: data.workedFromYear,
    // workedFromMonth: data.joiningDateMonth,
    monthlyStipend: data.monthlyStipend,
    }
   
    console.log("empData-->", empData);

    dispatch(jobSeekerEmploymentAdd(empData as any));
  };

  console.log("employmentData?.currentEmployment-->", employmentData?.currentEmployment);
  console.log("employmentData?.employmentType-->", employmentData?.employmentType);

  return (
    <div>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-medium text-gray-900">Add Employment</h1>
        <div className="col-span-full mb-4">
          <label htmlFor="currentEmployment" className="block text-sm font-medium leading-6 text-gray-900">Is this your current employment?</label>
          <div className="grid grid-cols-4 gap-4 mt-2 mt-2 flex justify-between items-center">
            {/* <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEmployment && selectedEmployment?.courseType === "fullTime"} id="yes" name="currentEmployment" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="fullTime" className="text-sm font-medium leading-6 text-gray-900">Yes</label>
            </div>
            <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEmployment && selectedEmployment?.courseType === "partTime"} id="no" name="currentEmployment" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="partTime" className="text-sm font-medium leading-6 text-gray-900">No</label>
            </div> */}
            {
            currentEmployment.map((option) => (
              <div key={option}>
                <label className="mr-3">
                  {option}
                  <Controller
                    name="currentEmployment"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="radio"
                        className="ml-5"
                        {...field}
                        checked={getValues("currentEmployment") === option}
                        onChange={() => {
                          setValue("currentEmployment", option);
                        }}
                      />
                    )}
                  />
                </label>

              </div>
            ))
          }
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="employmentType" className="block text-sm font-medium leading-6 text-gray-900">Employment type</label>
          <div className="grid grid-cols-4 gap-4 mt-2 flex justify-between items-center">
            {/* <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEmployment && selectedEmployment?.courseType === "fullTime"} id="fullTime" name="employmentType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="fullTime" className="text-sm font-medium leading-6 text-gray-900">Full Time</label>
            </div>
            <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEmployment && selectedEmployment?.courseType === "partTime"} id="internship" name="employmentType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="internship" className="text-sm font-medium leading-6 text-gray-900">Internship</label>
            </div> */}
            {
            employmentType.map((option) => (
              <div key={option}>
                <label className="mr-3">
                  {option}
                  <Controller
                    name="employmentType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="radio"
                        className="ml-5"
                        {...field}
                        checked={getValues("employmentType") === option}
                        onChange={() => {
                          setValue("employmentType", option);
                        }}
                      />
                    )}
                  />
                </label>

              </div>
            ))
          }
          </div>
        </div>

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="mb-4">
            <label htmlFor="totalExp" className="block text-sm font-medium leading-6 text-gray-900">Total Experience</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="totalExpYears" name="totalExpYears" autoComplete="totalExpYears" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select years</option>
                  {
                    experienceYears?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="totalExpYears"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select experience years"
                    options={experienceYears?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("totalExpYears")}
                  />
                )}
              />
              </div>
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="totalExpMonths" name="totalExpMonths" autoComplete="totalExpMonths" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select months</option>
                  {
                    experienceMonths?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="totalExpMonths"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select experience months"
                    options={experienceMonths?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("totalExpMonths")}
                  />
                )}
              />
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" &&
          <div className="col-span-full mb-4">
            <label htmlFor="currentCompanyName" className="block text-sm font-medium leading-6 text-gray-900">Current Company Name</label>
            <div className="mt-2">
              {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="currentCompanyName" id="currentCompanyName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
                control={control}
                name="currentCompanyName"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your current company"
                    options={currentCompany?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("currentCompanyName")}
                  />
                )}
              />
            </div>
          </div>
        }

        {watch('currentEmployment') === "No" &&
          <div className="col-span-full mb-4">
            <label htmlFor="previousCompanyName" className="block text-sm font-medium leading-6 text-gray-900">Pevious Company Name</label>
            <div className="mt-2">
              {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="previousCompanyName" id="previousCompanyName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
                control={control}
                name="previousCompanyName"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your previous company"
                    options={currentCompany?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("previousCompanyName")}
                  />
                )}
              />
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="col-span-full mb-4">
            <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
            <div className="mt-2">
              {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="location" id="location" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Select
                {...field}
                isClearable
                placeholder="Tell us about your location"
                options={locationList?.map(({ id, title }: any) => ({ value: id, label: title }))}
                defaultValue={watch("location")}
              />
            )}
          />
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="col-span-full mb-4">
            <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">Department</label>
            <div className="mt-2">
              {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="department" id="department" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
                control={control}
                name="department"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your department"
                    options={department?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("department")}
                  />
                )}
              />
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="col-span-full mb-4">
            <label htmlFor="currentDesignation" className="block text-sm font-medium leading-6 text-gray-900">Current Designation</label>
            <div className="mt-2">
              {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="currentDesignation" id="currentDesignation" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
                control={control}
                name="currentDesignation"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your current designation"
                    options={designation?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("currentDesignation")}
                  />
                )}
              />
            </div>
          </div>
        }

        {(watch('currentEmployment') === "No" && watch('employmentType') === "Full Time") &&
          <div className="col-span-full mb-4">
            <label htmlFor="previousDesignation" className="block text-sm font-medium leading-6 text-gray-900">Previous Designation</label>
            <div className="mt-2">
              {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="previousDesignation" id="previousDesignation" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
                control={control}
                name="previousDesignation"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your previous designation"
                    options={designation?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("previousDesignation")}
                  />
                )}
              />
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Full Time") &&
          <div className="mb-4">
            <label htmlFor="joiningDate" className="block text-sm font-medium leading-6 text-gray-900">Joining Date</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="joiningDateYear" name="joiningDateYear" autoComplete="joiningDateYear" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select year</option>
                  {
                    joiningDateYear?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="joiningDateYear"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select joining year"
                    options={joiningDateYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("joiningDateYear")}
                  />
                )}
              />
              </div>
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="joiningDateMonth" name="joiningDateMonth" autoComplete="joiningDateMonth" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select month</option>
                  {
                    joiningDateMonth?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="joiningDateMonth"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select joining month"
                    options={joiningDateMonth?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("joiningDateMonth")}
                  />
                )}
              />
              </div>
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="mb-4">
            <label htmlFor="workingFrom" className="block text-sm font-medium leading-6 text-gray-900">Working From</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="workingFrom" name="workingFrom" autoComplete="workingFrom" className="block 
                w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select year</option>
                  {
                    joiningDateYear?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="workedFromYear"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select working from year"
                    options={joiningDateYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("workedFromYear")}
                  />
                )}
              />
              </div>
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="joiningDateMonth" name="joiningDateMonth" autoComplete="joiningDateMonth" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select month</option>
                  {
                    joiningDateMonth?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="workedFromMonth"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select worked from month"
                    options={joiningDateMonth?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("workedFromMonth")}
                  />
                )}
              />
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === 'No' &&
          <div className="mb-4">
            <label htmlFor="workedTill" className="block text-sm font-medium leading-6 text-gray-900">Worked Till</label>
            <div className="grid grid-cols-4 gap-4 ">
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="workedTillYear" name="workedTillYear" autoComplete="workedTillYear" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select year</option>
                  {
                    joiningDateYear?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="workedTillYear"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select worked till year"
                    options={joiningDateYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("workedTillYear")}
                  />
                )}
              />
              </div>
              <div className="mt-1 col-span-2">
                {/* <select onChange={handleChange} id="workedTillMonth" name="workedTillMonth" autoComplete="workedTillMonth" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select month</option>
                  {
                    joiningDateMonth?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="workedTillMonth"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select worked till month"
                    options={joiningDateMonth?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("workedTillMonth")}
                  />
                )}
              />
              </div>
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Internship") &&
          <div className="mb-4">
            <label htmlFor="monthlyStipend" className="block text-sm font-medium leading-6 text-gray-900">Monthly Stipend</label>
            <div className="grid grid-cols-8 gap-4 ">
              <div className="mt-1 col-span-1">
                {/* <select onChange={handleChange} id="monthlyStipendType" name="monthlyStipendType" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select currency type</option>
                  {
                    currency?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="currentSalType"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder=""
                    options={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("currentSalType")}
                  />
                )}
              />
              </div>
              <div className="mt-1 col-span-7">
                {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="number" name="monthlyStipend" id="monthlyStipend" autoComplete="monthlyStipend" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
                <Controller
            name="monthlyStipend"
            control={control}
            //defaultValue={userData?.name}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
              </div>
            </div>
          </div>
        }



        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="mb-4">
            <label htmlFor="currentSalary" className="block text-sm font-medium leading-6 text-gray-900">Current Salary</label>
            <div className="grid grid-cols-8 gap-4 ">
              <div className="mt-1 col-span-1">
                {/* <select onChange={handleChange} id="currentSalType" name="currentSalType" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                  <option>select currency type</option>
                  {
                    currency?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                  }
                </select> */}
                <Controller
                control={control}
                name="currentSalType"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder=""
                    options={currency?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("currentSalType")}
                  />
                )}
              />
              </div>
              <div className="mt-1 col-span-7">
                {/* <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="number" name="currentSalary" id="currentSalary" autoComplete="currentSalary" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
                <Controller
            name="currentSalary"
            control={control}
            //defaultValue={userData?.name}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
              </div>
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="col-span-full mb-4">
            <label htmlFor="skillsUsed" className="block text-sm font-medium leading-6 text-gray-900">Skills Used</label>
            {/* <div className="mt-2">
              <input onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} type="text" name="skillsUsed" id="skillsUsed" autoComplete="skillsUsed" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div> */}
            <div className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-lg  mb-6">
              <Controller
                control={control}
                name="skillsUsed"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="Tell us about your skills"
                    options={skillsUsed?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("skillsUsed")}
                  />
                )}
              />
            </div>
          </div>
        }

        {(watch('currentEmployment') === "Yes" || watch('currentEmployment') === "No") && (watch('employmentType') === "Full Time") &&
          <div className="col-span-full mb-4">
            <label htmlFor="jobProfile" className="block text-sm font-medium leading-6 text-gray-900">Job Profile</label>
            <div className="mt-2">
              {/* <textarea onKeyUp={handleChange} defaultValue={selectedEmployment && selectedEmployment?.percentage} name="jobProfile" id="jobProfile" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
              <Controller
            name="jobProfile"
            control={control}
            //defaultValue={userData?.name}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full border border-gray-200 focus:border-blue-500 outline-none rounded-md px-2 py-1.5 mt-1"
                readOnly={false}
              />
            )}
          />
            </div>
          </div>
        }

        {watch('currentEmployment') === "Yes" && watch('employmentType') === "Full Time" &&
          <div className="col-span-full mb-4">
            <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Notice Period</label>
            <div className="mt-2">
              {/* <select onChange={handleChange} id="noticePeriod" name="noticePeriod" autoComplete="noticePeriod" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEmployment && selectedEmployment?.education !== ""}>
                <option>select notice period</option>
                {
                  noticePeriod?.map((item: any) => <option selected={isEdit && selectedEmployment && selectedEmployment?.education === item?.title}>{item?.title}</option>)
                }
              </select> */}
              <Controller
                control={control}
                name="noticePeriod"
                render={({ field }) => (
                  <Select
                    {...field}
                    isClearable
                    placeholder="select notice period"
                    options={noticePeriod?.map(({ id, title }: any) => ({ value: id, label: title }))}
                    defaultValue={watch("noticePeriod")}
                  />
                )}
              />
            </div>
          </div>
        }

        <div className="mt-5 flex justify-end items-center">
          <div>
            <button
              type="button"
              className="mr-3"
              onClick={closeDialog}
            >
              Cancel
            </button>
            <button
              form='my-form' type="submit"
              className={"rounded-3xl bg-blue-500 text-white px-5 py-1.5"}
            //disabled={watchProfileSummary === 0 || watch('profileSummary') === null}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
