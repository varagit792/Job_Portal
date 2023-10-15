import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../../';
import {
    getFilterJobs,
    clearGetFilterJobsSlice,
    setDepartment,
    setLocation,
    setWorkMode,
    setRoleCategory,
    setFilterDepartment,
    setFilterLocation,
    setFilterWorkMode,
    setFilterRoleCategory,
    setFilterExpYear,
    setFilterSalary,
} from '../../../store/reducers/jobs/GetFilterJobs';
import { scrollToTop } from '../../utils/utils';
import JobCard from './JobCard';
import FiltersExperience from './FiltersExperience';
import { FiltersDepartmentSlice } from './FiltersDepartment';
import FiltersLocation from './FiltersLocation';
import FiltersWorkMode from './FiltersWorkMode';
import FiltersSalary from './FiltersSalary';
import FiltersRoleCategory from './FiltersRoleCategory';
import FiltersModal from './FiltersModal';
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
    const { success,
        allJobs,
        loading,
        department,
        location,
        workMode,
        roleCategory,
        filtersData } = useAppSelector((state) => state.getFilterJobs);
    const [jobCard, setJobCard] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [toggleDispach, setToggleDispach] = useState(true);
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
    }, [dispatch, page, filtersData, toggleDispach]);

    useEffect(() => {
        if (success) {
            if (allJobs.length !== 0) {
                setJobCard((prev: any) => [...prev, ...allJobs]);
            } else {
                setToggleDispach(false);
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

    const handleTotalExpYearChange = (totalExpYear: number) => {
        dispatch(setFilterExpYear(totalExpYear))
        setPage(1);
        scrollToTop();
        setToggleDispach(true);
    };

    const handleDepartmentCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        dispatch(setDepartment(
            department?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterDepartment(data?.id));
        } else {
            dispatch(setFilterDepartment({ filterDepartment: data?.id }));
        }
    };

    const handleLocationCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        dispatch(setLocation(
            location?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ))
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterLocation(data?.id));
        } else {
            dispatch(setFilterLocation({ filterLocation: data?.id }));
        }
    };

    const handleWorkModeCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        dispatch(setWorkMode(
            workMode?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterWorkMode(data?.id));
        } else {
            dispatch(setFilterWorkMode({ filterWorkMode: data?.id }));
        }
    };

    const handleSalaryFilter = (salary: number) => {
        dispatch(setFilterSalary(salary));
        setPage(1);
        scrollToTop();
        setToggleDispach(true);
    };

    const handleRoleCategoryCheckbox = (data: any) => {
        scrollToTop();
        setToggleDispach(true);
        setJobCard([]);
        dispatch(setRoleCategory(
            roleCategory?.map((item: any) =>
                item?.id === data?.id ? { ...item, isChecked: !item.isChecked } : item
            )
        ));
        if (data?.isChecked === undefined || data?.isChecked === false) {
            dispatch(setFilterRoleCategory(data?.id));
        } else {
            dispatch(setFilterRoleCategory({ filterRoleCategory: data?.id }));
        }
    };

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
                        <FiltersDepartmentSlice
                            handleDepartmentCheckbox={handleDepartmentCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersLocation
                            handleLocationCheckbox={handleLocationCheckbox}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <FiltersWorkMode
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
            <FiltersModal isOpen={isOpen} setIsOpen={setIsOpen} setToggleDispach={setToggleDispach} />
        </>
    )
}

export default AllJobs;