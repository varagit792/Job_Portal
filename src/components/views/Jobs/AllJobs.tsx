import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../../';
import { getFilterJobs, clearGetFilterJobsSlice } from '../../../store/reducers/jobs/GetFilterJobs';
import { getTotalYearsExpList, getSalaryRangeList } from '../../utils/utils';
import JobCard from './JobCard';
import FiltersExperience from './FiltersExperience';
import FiltersDepartment from './FiltersDepartment';
import FiltersLocation from './FiltersLocation';
import FiltersWorkMode from './FiltersWorkMode';
import FiltersSalary from './FiltersSalary';
import FiltersRoleCategory from './FiltersRoleCategory';
import Modal from '../../commonComponents/Modal';
import compenyBrand from '../../../assets/png/companyBrand.png';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import BMWIcon from '../../../assets/svg/BMWIcon.svg';
import PandaIcon from '../../../assets/svg/PandaIcon.svg';
import DoleIcon from '../../../assets/svg/DoleIcon.svg';
import BelleIcon from '../../../assets/svg/BelleIcon.svg';
import DominousIcon from '../../../assets/svg/DominousIcon.svg';
import GoproIcon from '../../../assets/svg/GoproIcon.svg';
import Rectangle_19 from '../../../assets/svg/Rectangle-19.svg';

const AllJobs = () => {
    const dispatch = useAppDispatch();
    const { success, allJobs, loading } = useAppSelector((state) => state.getFilterJobs);
    const [jobCard, setJobCard] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [toggleDispach, setToggleDispach] = useState(true);
    const [department, setDepartment] = useState([]);
    const [location, setLocation] = useState([]);
    const [workMode, setWorkMode] = useState([]);
    const [roleCategory, setRoleCategory] = useState([]);
    const [filtersData, setFiltersData] = useState<any>({
        expYear: null,
        department: [],
        location: [],
        workMode: [],
        salary: null,
        roleCategory: []
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    useEffect(() => {
        if (toggleDispach) {
            if (filtersData?.expYear !== null || (filtersData?.department !== undefined && filtersData?.department?.length !== 0) || (filtersData?.location !== undefined && filtersData?.location?.length !== 0) || (filtersData?.workMode !== undefined && filtersData?.workMode?.length !== 0) || filtersData?.salary !== null || (filtersData?.roleCategory !== undefined && filtersData?.roleCategory?.length !== 0)) {
                dispatch(getFilterJobs({ page, data: filtersData }));
                setJobCard([]);
                setPage(1);
            } else {
                dispatch(getFilterJobs({ page }));
            }
        }
    }, [dispatch, page, filtersData]);

    useEffect(() => {
        if (success) {
            if (filtersData?.expYear !== null || (filtersData?.department !== undefined && filtersData?.department?.length !== 0) || (filtersData?.location !== undefined && filtersData?.location?.length !== 0) || (filtersData?.workMode !== undefined && filtersData?.workMode?.length !== 0) || filtersData?.salary !== null || (filtersData?.roleCategory !== undefined && filtersData?.roleCategory?.length !== 0)) {
                if (allJobs.length !== 0) {
                    setJobCard((prev: any) => [...prev, ...allJobs]);
                } else {
                    setToggleDispach(false);
                }
            } else {
                if (allJobs.length !== 0) {
                    setJobCard((prev: any) => [...prev, ...allJobs]);
                } else {
                    setToggleDispach(false);
                }
            }
            dispatch(clearGetFilterJobsSlice());
        }
    }, [success]);

    const handelInfiniteScroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleTotalExpYearChange = (totalExpYear: number) => {
        (async () => {
            const experienceYearsList = await getTotalYearsExpList();
            if (Object.keys(experienceYearsList)?.length) {
                const experienceYearsData = await experienceYearsList?.filter((item: any) => {
                    let data = item?.title?.split('');
                    let splitVal = data?.slice(0, data.length - 5);
                    let joinedVal = parseInt(splitVal?.join(''));
                    if (joinedVal === totalExpYear) {
                        return item
                    }
                })
                setFiltersData((preValue: any) => {
                    return {
                        ...preValue,
                        expYear: experienceYearsData?.[0]?.id
                    }
                });
                setJobCard([]);
                setPage(1);
                scrollToTop();
                setToggleDispach(true);
            }
        })();
    };

    const handleDepartmentCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        setDepartment((prevMapData: any) =>
            prevMapData?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
        if (data?.isChecked === undefined || data?.isChecked === false) {
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    department: [...filtersData?.department, data?.id]
                }
            });
        } else {
            const listOfArray = filtersData?.department?.filter((item: any) => data?.id !== item);
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    department: listOfArray
                }
            });
        }
    };

    const handleLocationCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        setLocation((prevMapData: any) =>
            prevMapData?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
        if (data?.isChecked === undefined || data?.isChecked === false) {
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    location: [...filtersData?.location, data?.id]
                }
            });
        } else {
            const listOfArray = filtersData?.location?.filter((item: any) => data?.id !== item);
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    location: listOfArray
                }
            });
        }
    }

    const handleWorkModeCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        setWorkMode((prevMapData: any) =>
            prevMapData?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
        if (data?.isChecked === undefined || data?.isChecked === false) {
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    workMode: [...filtersData?.workMode, data?.id]
                }
            });
        } else {
            const listOfArray = filtersData?.workMode?.filter((item: any) => data?.id !== item);
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    workMode: listOfArray
                }
            });
        }
    }

    const handleSalaryFilter = (salary: number) => {
        (async () => {
            const salaryRangeList = await getSalaryRangeList();
            if (Object.keys(salaryRangeList)?.length) {
                const salaryRangeListData = await salaryRangeList?.filter((item: any) => parseInt(item?.title) === salary);
                setFiltersData((preValue: any) => {
                    return {
                        ...preValue,
                        salary: salaryRangeListData?.[0]?.id
                    }
                });
                setJobCard([]);
                setPage(1);
                scrollToTop();
                setToggleDispach(true);
            }
        })();
    };

    const handleRoleCategoryCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        setRoleCategory((prevMapData: any) =>
            prevMapData?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
        if (data?.isChecked === undefined || data?.isChecked === false) {
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    roleCategory: [...filtersData?.roleCategory, data?.id]
                }
            });
        } else {
            const listOfArray = filtersData?.roleCategory?.filter((item: any) => data?.id !== item);
            setFiltersData((preValue: any) => {
                return {
                    ...preValue,
                    roleCategory: listOfArray
                }
            });
        }
    }

    const onClickJobCard = (jobId: any) => {
        window.open(`/allJobs/jobDescription/${jobId}`, '_blank');
    }

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-4">
                    <div className="bg-[#FFF] rounded-xl p-4 sticky top-[13%]">
                        <h1 className="flex justify-between items-center leading-none"><span className="text-[#475569] font-bold">Filters</span><span className="bg-[#F8FAFC] rounded px-2 py-1 text-[#4F46E5]">4</span></h1>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersExperience handleTotalExpYearChange={handleTotalExpYearChange} />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersDepartment
                            handleDepartmentCheckbox={handleDepartmentCheckbox}
                            department={department}
                            setDepartment={setDepartment}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersLocation
                            location={location}
                            setLocation={setLocation}
                            handleLocationCheckbox={handleLocationCheckbox}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersWorkMode
                            workMode={workMode}
                            setWorkMode={setWorkMode}
                            handleWorkModeCheckbox={handleWorkModeCheckbox}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersSalary handleSalaryFilter={handleSalaryFilter} />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Company Type</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersRoleCategory
                            roleCategory={roleCategory}
                            setRoleCategory={setRoleCategory}
                            handleRoleCategoryCheckbox={handleRoleCategoryCheckbox}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Education</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Posted By</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Industry</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Top Companies</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Posting Date</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Engineering</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">IT and Information</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Consulting</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Marketing</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
                <div className="col-start-4 col-end-11">
                    <JobCard onClickJobCard={onClickJobCard} jobCard={jobCard} loading={loading} />
                </div>
                <div className="col-start-11 col-end-13">
                    <div className="bg-[#F1F5F9] rounded-xl w-full p-5 sticky top-[13%]">
                        <h1 className="leading-none mb-3">Top Companies</h1>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex justify-center items-center">
                                <img src={PandaIcon} alt="PandaIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={DoleIcon} alt="DoleIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={BMWIcon} alt="BMWIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={BelleIcon} alt="BelleIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={DominousIcon} alt="DominousIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={GoproIcon} alt="GoproIcon" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={Rectangle_19} alt="Rectangle_19" />
                            </div>
                            <div className="flex justify-center items-center">
                                <img src={compenyBrand} alt="compenyBrand" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalBody={
                    <>
                        <h1 className="font-bold absolute top-0 m-0 p-0 mt-6">Filters</h1>
                     
                    </>
                }
            />
        </>
    )
}

export default AllJobs;