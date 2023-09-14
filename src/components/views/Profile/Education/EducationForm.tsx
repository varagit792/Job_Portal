import React, { useEffect, useState } from 'react'
import { getCourseList, getEducationTypeList, getInstituteList, getPassOutYearList } from '../../../utils/utils';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../..';
import { jobSeekerEducationAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import Select from 'react-select';

// interface IFormInputs {
//   keySkills: string;
// }
interface IFormInputs {
  id: number,
    courseType: string,
    education: { value: string; label: string; },
    institute: { value: string; label: string; },
    passingYear: { value: string; label: string; },
    percentage: number,
    specialization: { value: string; label: string; }
}

const options = ['Part Time', 'Full Time', 'Distance'];

export default function ({ closeDialog, educationDetails, selectedEducation, isEdit }: any) {
  const [courses, setCourses] = useState([]);
  const [eductionType, setEducationType] = useState([]);
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

  // const {
  //   //register,
  //   handleSubmit,
  //   //formState: { errors }
  // } = useForm<IFormInputs>({
  //   //resolver: yupResolver(ResumeSchema)
  // });

  //react hook form controls
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<IFormInputs | any>({
    defaultValues: {
      courseType: selectedEducation?.courseType ? selectedEducation?.courseType : '',
      education: selectedEducation?.education
        ? {
          value: (institute?.filter((item: any) => item?.title === selectedEducation?.education) as any)?.[0]?.id, label: selectedEducation?.education
        }
        : '',
      institute: selectedEducation?.institute
        ? {
          value: (institute?.filter((item: any) => item?.title === selectedEducation?.institute) as any)?.[0]?.id, label: selectedEducation?.institute
        } 
        : '',
      specialization: selectedEducation?.specialization
        ? {
          value: (institute?.filter((item: any) => item?.title === selectedEducation?.specialization) as any)?.[0]?.id, label: selectedEducation?.specialization
        }
        : '',
      passingYear: selectedEducation?.passingYear
        ? {
          value: (institute?.filter((item: any) => item?.title === selectedEducation?.passingYear) as any)?.[0]?.id, label: selectedEducation?.passingYear
        }
        : '',
      percentage: selectedEducation?.percentage ? selectedEducation?.percentage :'',
    },
    //resolver: yupResolver(basicDetailsSchema)
  });


  useEffect(() => {
    (async () => {
      const courseList = await getCourseList()
      setCourses(courseList as any)
    })();
  }, [])

  //console.log("selectedEducation-->", (institute?.filter((item:any)=> item?.title === selectedEducation?.institute) as any)[0].id);
  
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
  const onSubmit = (data: IFormInputs) => {
    let educationData = [];
    educationData.push({
      jobSeekerProfile: id,
      courseType: data?.courseType,
      education: data?.education?.label,
      institute: data?.institute?.label,
      passingYear: data?.passingYear?.label,
      percentage: data?.percentage,
      specialization: data?.specialization?.label,
      id:selectedEducation?.id ? selectedEducation?.id : null
    })
    
    dispatch(jobSeekerEducationAdd(educationData as any));
  };

  console.log("selectedEducation-->", selectedEducation);

  return (
    <div>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-medium text-gray-900 mb-2">Add Education</h1>
        <div className="col-span-full mb-4">
          <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Education</label>
          <div className="mt-1">
            {/* <select onChange={handleChange} id="education" name="education" autoComplete="education-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" disabled={isEdit && selectedEducation && selectedEducation?.education !== ""}>
              <option>select education</option>
              {
                eductionType?.map((item: any) => <option selected={isEdit && selectedEducation && selectedEducation?.education === item?.title}>{item?.title}</option>)
              }
            </select> */}
            <Controller
                  control={control}
                  name="education"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="Select education"
                      options={eductionType?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('education')}

                    />
                  )}
                />
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="institute" className="block text-sm font-medium leading-6 text-gray-900">Institute</label>
          <div className="mt-1">
            {/* <select onChange={handleChange} id="institute" name="institute" autoComplete="institute" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
              <option>select institute</option>
              {
                institute?.map((item: any) => <option selected={selectedEducation && selectedEducation?.institute === item?.title}>{item?.title}</option>)
              }
            </select> */}
            <Controller
                  control={control}
                  name="institute"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="Select institute"
                      options={institute?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('institute')}

                    />
                  )}
                />
          </div>
        </div>

        {(educationData?.education !== "10th" && educationData?.education !== "12th") &&
          <div className="col-span-full mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium leading-6 text-gray-900">Specialization</label>
            <div className="mt-1">
              {/* <select onChange={handleChange} id="specialization" name="specialization" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
                <option>select specialization</option>
                {
                  courses?.map((item: any) => <option selected={selectedEducation && selectedEducation?.specialization === item?.title}>{item?.title}</option>)
                }
              </select> */}
              <Controller
                  control={control}
                  name="specialization"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="Select specialization"
                      options={courses?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('specialization')}

                    />
                  )}
                />
            </div>
          </div>
        }
        <div className="col-span-full mb-4">
          <label htmlFor="courseType" className="block text-sm font-medium leading-6 text-gray-900">Course Type</label>
          <div className="mt-2 flex justify-between items-center">
            {/* <div className="flex items-center">
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
            </div> */}
            {
            options.map((option) => (
              <div key={option}>
                <label className="mr-3">
                  {option}
                  <Controller
                    name="courseType"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        type="radio"
                        className="ml-5"
                        {...field}
                        checked={getValues("courseType") === option}
                        onChange={() => {
                          setValue("courseType", option);
                        }}
                      />
                    )}
                  />
                </label>
                {errors.jobSeekerType && <p className="font-normal text-xs text-red-500">{errors.jobSeekerType.message as string}</p>}
              </div>
            ))
          }
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="passingYear" className="block text-sm font-medium leading-6 text-gray-900">Passing Year</label>
          <div className="mt-1">
            {/* <select onChange={handleChange} id="passingYear" name="passingYear" autoComplete="passingYear" className="block w-full rounded-md border-0 py-1.5   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
              <option>select year</option>
              {
                passOutYear?.map((item: any) => <option selected={selectedEducation && selectedEducation?.passingYear === item?.title}>{item?.title}</option>)
              }
            </select> */}
            <Controller
                  control={control}
                  name="passingYear"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="Select passing year"
                      options={passOutYear?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('passingYear')}

                    />
                  )}
                />
          </div>
        </div>

        <div className="col-span-full mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">Percentage</label>
          <div className="mt-2">
            {/* <input onKeyUp={handleChange} defaultValue={selectedEducation && selectedEducation?.percentage} type="number" name="percentage" id="percentage" autoComplete="percentage" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> */}
            <Controller
            name="percentage"
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
