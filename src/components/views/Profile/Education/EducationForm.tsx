import React, { useEffect, useState } from 'react'
import { getBoardList, getCourseList, getEducationTypeList, getInstituteList, getPassOutYearList } from '../../../utils/utils';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../..';
import { jobSeekerEducationAdd } from '../../../../store/reducers/jobSeekerProfile/jobSeekerEducation';
import Select from 'react-select';
interface IFormInputs {
  id: number,
  courseType: string,
  education: { value: string; label: string; },
  institute: { value: string; label: string; },
  passingYear: { value: string; label: string; },
  board: { value: string; label: string; },
  percentage: number,
  specialization: { value: string; label: string; }
}

const options = ['Part Time', 'Full Time', 'Distance'];

export default function ({ closeDialog, educationDetails, selectedEducation, isEdit }: any) {
  const [courses, setCourses] = useState([]);
  const [eductionType, setEducationType] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [passOutYear, setPassOutYear] = useState([]);
  const [board, setBoard] = useState([]);

  const { profileDashboard } = useAppSelector((state) => state.getProfileDashboard);

  const id = profileDashboard?.id;
  const dispatch = useAppDispatch();

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
        board: selectedEducation?.board
        ? {
          value: (board?.filter((item: any) => item?.title === selectedEducation?.board) as any)?.[0]?.id, label: selectedEducation?.board
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

  useEffect(() => {
    (async () => {
      const boardList = await getBoardList()
      setBoard(boardList as any)
    })();
  }, [])

  // OnSubmit button
  const onSubmit = (data: IFormInputs) => {
    let educationData = [];
    educationData.push({
      jobSeekerProfile: id,
      courseType: data?.courseType,
      education: data?.education?.label,
      board: data?.board?.label,
      institute: data?.institute?.label,
      passingYear: data?.passingYear?.label,
      percentage: data?.percentage,
      specialization: data?.specialization?.label,
      id:selectedEducation?.id ? selectedEducation?.id : null
    })
    
    dispatch(jobSeekerEducationAdd(educationData as any));
  };

  return (
    <div>
      <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-medium text-gray-900 mb-2">Add Education</h1>
        <div className="col-span-full mb-4">
          <label htmlFor="education" className="block text-sm font-medium leading-6 text-gray-900">Education</label>
          <div className="mt-1">
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

        {(watch('education')?.label === "10th" || watch('education')?.label === "12th") &&
          <div className="col-span-full mb-4">
          <label htmlFor="board" className="block text-sm font-medium leading-6 text-gray-900">Board</label>
          <div className="mt-1">
            <Controller
                  control={control}
                  name="board"
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      placeholder="Select board"
                      options={board?.map(({ id, title }: any) => ({ value: id, label: title }))}
                      defaultValue={watch('board')}

                    />
                  )}
                />
          </div>
        </div>
        }

        <div className="col-span-full mb-4">
          <label htmlFor="institute" className="block text-sm font-medium leading-6 text-gray-900">Institute</label>
          <div className="mt-1">
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

        {(watch('education')?.label !== "10th" && watch('education')?.label !== "12th") &&
          <div className="col-span-full mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium leading-6 text-gray-900">Specialization</label>
            <div className="mt-1">              
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
