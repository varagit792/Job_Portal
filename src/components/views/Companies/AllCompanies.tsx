import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../..';
import CompanyCard from './CompanyCard';
import companyBrand from '../../../assets/png/companyBrand.png';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import BMWIcon from '../../../assets/svg/BMWIcon.svg';
import PandaIcon from '../../../assets/svg/PandaIcon.svg';
import DoleIcon from '../../../assets/svg/DoleIcon.svg';
import BelleIcon from '../../../assets/svg/BelleIcon.svg';
import DominousIcon from '../../../assets/svg/DominousIcon.svg';
import GoproIcon from '../../../assets/svg/GoproIcon.svg';
import Rectangle_19 from '../../../assets/svg/Rectangle-19.svg';
import { BiSearch } from 'react-icons/bi';
import { getAllCompanies, clearGetAllCompaniesSlice, setDepartment, setFilterDepartment, setFilterLocation, setLocation } from '../../../store/reducers/companies/getAllCompanies';
import { CompanyDepartmentFilter } from './CompanyDepartmentFilter';
import { scrollToTop } from '../../utils/utils';
import FiltersModal from '../Companies/FiltersModal';
import { CompanyLocationFilter } from './CompanyLocationFilter';

const AllCompanies = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { success, allCompanies, loading, department, filtersData, location } = useAppSelector((state) => state.getAllCompanies);
    // const { success:filteredSuccess,
    //     allCompanies:allFilteredCompanies,
    //     loading:filteredLoading,
    //     department,
    //     location,
    //     workMode,
    //     roleCategory,
    //     filtersData } = useAppSelector((state) => state.getFilterCompanies);
    const [page, setPage] = useState(1);
    const [toggleDispach, setToggleDispach] = useState(true);
    const [range, setRange] = useState(0);
    const [salary, setSalary] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [companyCard, setCompanyCard] = useState<any>([]);

    console.log("filtersData-->", filtersData);
    
    useEffect(() => {
        window.addEventListener("scroll", handelInfiniteScroll);
        return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);

    useEffect(() => {
        if (toggleDispach) {
            dispatch(getAllCompanies({page}));
        }
    }, [dispatch, page]);

    useEffect(() => {
        if (toggleDispach) {
            if ((filtersData?.department !== undefined && filtersData?.department?.length !== 0) || (filtersData?.location !== undefined && filtersData?.location?.length !== 0)) {
                dispatch(getAllCompanies({ page, data: filtersData }));
                setCompanyCard([]);
                setPage(1);
            } else {
                dispatch(getAllCompanies({ page }));
            }
        }
    }, [dispatch, page, filtersData, toggleDispach]);

    useEffect(() => {
        if (success) {
            if (allCompanies.length !== 0) {
                setCompanyCard((prev: any) => [...prev, ...allCompanies]);
            } else {
                setToggleDispach(false);
            }
            dispatch(clearGetAllCompaniesSlice());
        }
    }, [success])

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

    const handleRangeChange = (event: React.FormEvent<HTMLInputElement> | any) => {
        setRange(event.target.value);
    };

    const handleSalaryChange = (event: React.FormEvent<HTMLInputElement> | any) => {
        setSalary(event.target.value);
    };

    const onClickCompanyCard = (companyId: any) => {
		window.open(`/allCompanies/companyDescription/${companyId}`, '_blank');
    }

    const handleDepartmentCheckbox = (data: any) => { 
        scrollToTop();
        setToggleDispach(true);
        setCompanyCard([]);
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
        setCompanyCard([]);
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

    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-4">
                    <div className="bg-[#FFF] rounded-xl p-4 sticky top-[13%]">
                        <h1 className="flex justify-between items-center leading-none"><span className="text-[#475569] font-bold">Filters</span><span className="bg-[#F8FAFC] rounded px-2 py-1 text-[#4F46E5]">4</span></h1>
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
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Sales</label>
                                            </div>
                                            <button className="text-[#4F46E5]">View all...</button>
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
                        {/* <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Nature Of Business</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel>
                                            <div className="relative flex items-center w-full py-1.5 border border-[#E0E7FF] rounded-lg overflow-hidden my-5">
                                                <div className="grid place-items-center h-full w-12 text-gray-300">
                                                    <BiSearch className="h-5 w-5" />
                                                </div>
                                                <input
                                                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                                    type="text"
                                                    id="search"
                                                    placeholder="Search something.." />
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">New Delhi</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Bangalore</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Hyderabad</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Noida</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Mumbai</label>
                                            </div>
                                            <button className="text-[#4F46E5]">View all...</button>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div> */}
                        <CompanyLocationFilter
                            handleLocationCheckbox={handleLocationCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <CompanyDepartmentFilter
                            handleDepartmentCheckbox={handleDepartmentCheckbox}
                            setIsOpen={setIsOpen}
                        />
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-semibold">Companies</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">On-site</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Remote</label>
                                            </div>
                                            <div className="text-[#475569] mb-3">
                                                <input type="checkbox" defaultChecked={true} />
                                                <label className="ml-2">Hybrid</label>
                                            </div>
                                            <div className="text-[#475569]">
                                                <input type="checkbox" defaultChecked={false} />
                                                <label className="ml-2">Temp. Remote</label>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>                        
                    </div>
                </div>
                <div className="col-start-4 col-end-11">
                    <CompanyCard onClickCompanyCard={onClickCompanyCard} companyCard={companyCard} loading={loading} />
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
                                <img src={companyBrand} alt="companyBrand" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {isOpen &&  <FiltersModal isOpen={isOpen} setIsOpen={setIsOpen} setToggleDispach={setToggleDispach} />}
        </>
    )
}

export default AllCompanies