import React, { useEffect, useState } from 'react'
import { getCourseList, getCurrencyList, getEducationTypeList, getInstituteList, getJoiningDateMonthList, getJoiningDateYearList, getNoticePeriodList, getPassOutYearList, getTotalMonthsExpList, getTotalYearsExpList } from '../../../utils/utils';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../..';
import { jobSeekerEducationAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';

interface IFormInputs {
  keySkills: string;
}

export default function ({ closeDialog, educationDetails, selectedEducation, isEdit }: any) {
  const [courses, setCourses] = useState([]);
  const [eductionType, setEducationType] = useState([]);
  const [experienceYears, setExperienceYears] = useState([]);
  const [experienceMonths, setExperienceMonths] = useState([]);
  const [joiningDateYear, setJoiningDateYear] = useState([]);
  const [joiningDateMonth, setJoiningDateMonth] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [noticePeriod, setNoticePeriod] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [passOutYear, setPassOutYear] = useState([]);
  const [educationData, setEducationData] = useState({
    id: selectedEducation?.id && selectedEducation?.id,
    courseType: selectedEducation?.courseType ? selectedEducation?.courseType : '',
    education: selectedEducation?.education ? selectedEducation?.education : '',
    institute: selectedEducation?.institute ? selectedEducation?.institute : '',
    passingYear: selectedEducation?.passingYear ? selectedEducation?.passingYear : '',
    percentage: selectedEducation?.percentage ? selectedEducation?.percentage : '',
    specialization: selectedEducation?.specialization ? selectedEducation?.specialization : ''
  })

  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

  const id = profileDashboard?.id;
  const dispatch = useAppDispatch();

  const {
    //register,
    handleSubmit,
    //formState: { errors }
  } = useForm<IFormInputs>({
    //resolver: yupResolver(ResumeSchema)
  });

  useEffect(() => {
    (async () => {
      const courseList = await getCourseList()
      setCourses(courseList as any)
    })();
  }, [])

  useEffect(() => {
    (async () => {
      const eductionTypeList = await getEducationTypeList()
      console.log("educationDetails-->", educationDetails);
      const coursesString = [] as any
      if (Object.keys(educationDetails).length && !Object.keys(selectedEducation).length && !isEdit) {
        educationDetails.map((item: any) => {
          coursesString.push(item.education)
          const filteredCourses = eductionTypeList.filter((item1: any) => !coursesString.includes(item1.title))
          console.log("filteredCourses-->", filteredCourses);
          setEducationType(filteredCourses as any)
        })
      } else {
        setEducationType(eductionTypeList as any)
      }
    })();
  }, [])

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
    if (name === "courseType") {
      setEducationData({ ...educationData, ['courseType']: id as any })
    } else {
      setEducationData({ ...educationData, [name]: value as any })
    }
  }

  // OnSubmit button
  const onSubmit = () => {
    let data = [];
    data.push({
      jobSeekerProfile: id,
      courseType: educationData.courseType,
      education: educationData.education,
      institute: educationData.institute,
      passingYear: educationData.passingYear,
      percentage: educationData.percentage,
      specialization: educationData.specialization,
      id: educationData.id
    })
    dispatch(jobSeekerEducationAdd(data as any));
  };

  console.log("selectedEducation-->", selectedEducation);

  return (
    <div>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-medium text-gray-900">Add Employment</h1>
        <div className="col-span-full mb-4">
          <label htmlFor="currentEmployment" className="block text-sm font-medium leading-6 text-gray-900">Is this your current employment?</label>
          <div className="grid grid-cols-4 gap-4 mt-2 mt-2 flex justify-between items-center">
            <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "fullTime"} id="yes" name="currentEmployment" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="fullTime" className="text-sm font-medium leading-6 text-gray-900">Yes</label>
            </div>
            <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "partTime"} id="no" name="currentEmployment" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="partTime" className="text-sm font-medium leading-6 text-gray-900">No</label>
            </div>
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="employmentType" className="block text-sm font-medium leading-6 text-gray-900">Employment type</label>
          <div className="grid grid-cols-4 gap-4 mt-2 flex justify-between items-center">
            <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "fullTime"} id="yes" name="employmentType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="fullTime" className="text-sm font-medium leading-6 text-gray-900">Full Time</label>
            </div>
            <div className="col-span-2 flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "partTime"} id="no" name="employmentType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="internship" className="text-sm font-medium leading-6 text-gray-900">Internship</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Total Experience</label>
          <div className="grid grid-cols-4 gap-4 ">
            <div className="mt-1 col-span-2">
              <select onChange={handleChange} id="education" name="education" autoComplete="education-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
                <option>select years</option>
                {
                  experienceYears?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
                }
              </select>
            </div>
            <div className="mt-1 col-span-2">
              <select onChange={handleChange} id="education" name="education" autoComplete="education-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
                <option>select months</option>
                {
                  experienceMonths?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
                }
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="currentCompanyName" className="block text-sm font-medium leading-6 text-gray-900">Current Company Name</label>
          <div className="mt-2">
            <input onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} type="text" name="currentCompanyName" id="currentCompanyName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="currentDesignation" className="block text-sm font-medium leading-6 text-gray-900">Current Designation</label>
          <div className="mt-2">
            <input onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} type="text" name="currentDesignation" id="currentDesignation" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="joiningDate" className="block text-sm font-medium leading-6 text-gray-900">Joining Date</label>
          <div className="grid grid-cols-4 gap-4 ">
            <div className="mt-1 col-span-2">
              <select onChange={handleChange} id="joiningDate" name="joiningDate" autoComplete="joiningDate" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
                <option>select year</option>
                {
                  joiningDateYear?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
                }
              </select>
            </div>
            <div className="mt-1 col-span-2">
              <select onChange={handleChange} id="education" name="education" autoComplete="education-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
                <option>select month</option>
                {
                  joiningDateMonth?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
                }
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Current Salary</label>
          <div className="grid grid-cols-8 gap-4 ">
            <div className="mt-1 col-span-1">
              <select onChange={handleChange} id="education" name="education" autoComplete="education-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
                <option>select currency</option>
                {
                  currency?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
                }
              </select>
            </div>
            <div className="mt-1 col-span-7">
              {/* <select onChange={handleChange} id="education" name="education" autoComplete="education-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
              <option>select education</option>
              {
                eductionType?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
              }
            </select> */}
              <input onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} type="number" name="percentage" id="percentage" autoComplete="percentage" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Skills Used</label>
          <div className="mt-2">
            <input onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} type="text" name="percentage" id="percentage" autoComplete="percentage" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Job Profile</label>
          <div className="mt-2">
            <textarea onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} name="percentage" id="percentage" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Notice Period</label>
          <div className="mt-2">
            <select onChange={handleChange} id="noticePeriod" name="noticePeriod" autoComplete="noticePeriod" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
              <option>select notice period</option>
              {
                noticePeriod?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
              }
            </select>
          </div>
        </div>

        {/* Not Required from here */}
        {/* {(educationData?.education !== "10th" && educationData?.education !== "12th") &&
          <div className="col-span-full mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium leading-6 text-gray-900">Specialization</label>
            <div className="mt-1">
              <select onChange={handleChange} id="specialization" name="specialization" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                <option>select specialization</option>
                {
                  courses?.map((item: any) => <option selected={selectedEducation && selectedEducation?.specialization === item?.title}>{item?.title}</option>)
                }
              </select>
            </div>
          </div>
        }
        <div className="col-span-full mb-4">
          <label htmlFor="courseType" className="block text-sm font-medium leading-6 text-gray-900">Course Type</label>
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "fullTime"} id="fullTime" name="courseType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="fullTime" className="text-sm font-medium leading-6 text-gray-900">Full Time</label>
            </div>
            <div className="flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "partTime"} id="partTime" name="courseType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="partTime" className="text-sm font-medium leading-6 text-gray-900">Part Time</label>
            </div>
            <div className="flex items-center">
              <input onChange={handleChange} defaultChecked={selectedEducation && selectedEducation?.courseType === "distance"} id="distance" name="courseType" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-1" />
              <label htmlFor="distance" className="text-sm font-medium leading-6 text-gray-900">Distance</label>
            </div>
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="passingYear" className="block text-sm font-medium leading-6 text-gray-900">Passing Year</label>
          <div className="mt-1">
            <select onChange={handleChange} id="passingYear" name="passingYear" autoComplete="passingYear" className="block w-full rounded-md border-0 py-1.5   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
              <option>select year</option>
              {
                passOutYear?.map((item: any) => <option selected={selectedEducation && selectedEducation?.passingYear === item?.title}>{item?.title}</option>)
              }
            </select>
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Percentage</label>
          <div className="mt-2">
            <input onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} type="number" name="percentage" id="percentage" autoComplete="percentage" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div> */}

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
