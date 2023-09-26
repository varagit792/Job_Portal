import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import PaginatedItems from '../../commonComponents/ReactPaginate';
import compenyBrand from '../../../assets/png/companyBrand.png';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import MoneyIcon from '../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import BMWIcon from '../../../assets/svg/BMWIcon.svg';
import PandaIcon from '../../../assets/svg/PandaIcon.svg';
import DoleIcon from '../../../assets/svg/DoleIcon.svg';
import BelleIcon from '../../../assets/svg/BelleIcon.svg';
import DominousIcon from '../../../assets/svg/DominousIcon.svg';
import GoproIcon from '../../../assets/svg/GoproIcon.svg';
import Rectangle_19 from '../../../assets/svg/Rectangle-19.svg';
import { BiSearch } from 'react-icons/bi';


const itemsForReactPaginate: any = [
    {
        id: 1,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 2,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 3,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 4,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 5,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 6,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 7,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 8,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 9,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    },
    {
        id: 10,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai",
        descpition: "Involve in the complete life cycle stages including Design, Development, Security, publishing, scalability, monitoring, Analysis and monetization ..etc for robust, secure, scalable, Integration solutions to drive business"
    }
];

const AllJobs = () => {
    // using for pagination start
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = itemsForReactPaginate.slice(itemOffset, endOffset);
    // using for pagination end
    const [range, setRange] = useState(0);

    const handleRangeChange = (event: React.FormEvent<HTMLInputElement> | any) => {
        // event.stopPropagation();
        setRange(event.target.value);
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
                                            <label className="text-[#475569] font-bold">Experience</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="relative">
                                                <input className="w-full h-3 rounded-lg overflow-hidden appearance-none bg-[#EEF2FF] cursor-pointer"
                                                    type="range"
                                                    min="0"
                                                    max="20"
                                                    value={range}
                                                    onChange={handleRangeChange}
                                                />
                                                {/* <span className="bg-[#EEF2FF] rounded-md border border-[#C7D2FE] text-[#312E81] absolute top-1/2 leading-none -translate-x-1/2 -translate-y-1/2 h-6 w-6 cursor-pointer appearance-none opacity-0" style={{ left: `${range * 5}%` }}>{`${range}Yrs`}</span> */}
                                            </div>
                                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                                <span>0 Yrs</span>
                                                <span>20+ Yrs</span>
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
                                            <label className="text-[#475569] font-bold">Department</label>
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
                                            <label className="text-[#475569] font-bold">Location</label>
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
                        </div>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-bold">Work Mode</label>
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
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <label className="text-[#475569] font-bold">Salary</label>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="relative">
                                                <input className="w-full h-3 rounded-lg overflow-hidden appearance-none bg-[#EEF2FF] cursor-pointer"
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    value={range}
                                                    onChange={handleRangeChange}
                                                />
                                            </div>
                                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                                <span>4 LPA</span>
                                                <span>50+ LPA</span>
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
                                            <label className="text-[#475569] font-bold">Company Type</label>
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
                                            <label className="text-[#475569] font-bold">Role Category</label>
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
                                            <label className="text-[#475569] font-bold">Education</label>
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
                                            <label className="text-[#475569] font-bold">Posted By</label>
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
                                            <label className="text-[#475569] font-bold">Industry</label>
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
                                            <label className="text-[#475569] font-bold">Top Companies</label>
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
                                            <label className="text-[#475569] font-bold">Posting Date</label>
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
                    <div>
                        {currentItems.map((item: any, index: any) => (
                            <div className="py-5 px-5 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg mb-5" key={index}>
                                <div className="flex items-start justify-between">
                                    <div className="flex justify-start items-start h-full">
                                        <img src={item?.companyLogo} alt="compenyBrand" />
                                        <div className="ml-5">
                                            <h1 className="text-lg font-bold">{item.job}</h1>
                                            <span className="text-[#94A3B8] text-sm">{item?.companyName}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="px-1">
                                            <img src={BookMark} alt="BookMark" className=" h-4 w-4" />
                                        </button>
                                        <button className="px-2">
                                            <img src={ThreeDots} alt="ThreeDots" className=" h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-5 bg-[#E0E7FF]" />
                                <div className="flex justify-start items-center mb-5">
                                    <div className=" flex justify-start items-center text-[#64748B] text-sm">
                                        <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                                        <span className="ml-2 leading-none">{item.experience}</span>
                                    </div>
                                    <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
                                        <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item.salary}</span>
                                    </div>
                                    <div className=" flex justify-start items-center ml-5 text-[#64748B] text-sm">
                                        <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2 leading-none">{item.location}</span>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <ul className="list-disc text-[#94A3B8] text-sm pl-5">
                                        <li>
                                            <span className="line-clamp-3 list-inside">{item?.descpition}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-start">
                                    <button className="bg-[#FFFAF2] text-[#EA580C] px-3 py-1.5 rounded-lg mr-5 text-sm">Remote</button>
                                    <button className="bg-[#F0FFF5] text-[#16A34A] px-3 py-1.5 rounded-lg mr-5 text-sm">Full-time</button>
                                    <span className="text-[#94A3B8] text-sm">Posted 4 hrs ago</span>
                                </div>
                            </div>
                        ))}
                        <PaginatedItems itemsPerPage={itemsPerPage} items={itemsForReactPaginate} itemOffset={itemOffset} setItemOffset={setItemOffset} />
                    </div>
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
        </>
    )
}

export default AllJobs