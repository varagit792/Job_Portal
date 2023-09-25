import React, { useState } from 'react';
import PaginatedItems from '../../commonComponents/ReactPaginate';
import compenyBrand from '../../../assets/png/companyBrand.png';
import ThreeDots from '../../../assets/svg/threeDots.svg';
import BookMark from '../../../assets/svg/bookMark.svg';
import MoneyIcon from '../../../assets/svg/MoneyIcon.svg';
import ExperienceIcon from '../../../assets/svg/ExperienceIcon.svg';
import LocationIcon from '../../../assets/svg/LocationIcon.svg';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const itemsForReactPaginate: any = [
    {
        id: 1,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    },
    {
        id: 2,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    },
    {
        id: 3,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    },
    {
        id: 4,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    },
    {
        id: 4,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    },
    {
        id: 4,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    },
    {
        id: 4,
        job: "Dot net developer",
        companyName: "Ratna Global Tech",
        companyLogo: compenyBrand,
        experience: "6+ yrs exp",
        salary: "12 LPA",
        location: "Hyderabad, Delhi, Mumbai"
    }
];

const AllJobs = () => {
    // using for pagination
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = itemsForReactPaginate.slice(itemOffset, endOffset);
    return (
        <>
            <div className="h-[10%] w-full"></div>
            <div className="grid grid-cols-12 gap-10 px-32 bg-[#F8FAFC] py-6">
                <div className="col-start-1 col-end-4">
                    <div className="bg-[#FFF] rounded-xl p-4">
                        <h1 className="flex justify-between items-center leading-none"><span className="text-[#475569] font-bold">Filters</span><span className="bg-[#F8FAFC] rounded px-2 py-1 text-[#4F46E5]">4</span></h1>
                        <hr className="bg-[#E0E7FF] my-5" />
                        <div className="w-full">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full justify-between items-center">
                                            <span className="text-[#475569] font-bold">Experience</span>
                                            <ChevronUpIcon
                                                className={`${open ? 'rotate-180 transform' : ''
                                                    } h-5 w-5 text-gray-600`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-5">
                                            <div className="w-full bg-[#C7D2FE] rounded-md mb-5">
                                                <div className="bg-blue-700 text-center text-xs font-medium h-2.5 relative rounded-md" style={{ width: `50%` }}>
                                                    <span className="bg-[#EEF2FF] rounded-md border border-[#C7D2FE] text-[#312E81] absolute right-0 top-1/2 px-1 py-0.5 -translate-y-1/2">{`50%`}</span>
                                                </div>
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

                    </div>
                </div>
                <div className="col-start-4 col-end-11">
                    <div>
                        {currentItems.map((item: any, index: any) => (
                            <div className="py-5 px-10 bg-[#FFF] rounded-xl shadow-sm hover:shadow-lg h-40 mb-5" key={index}>
                                <div className="flex items-start justify-between">
                                    <div className="flex justify-start items-start h-full">
                                        <img src={item.companyLogo} alt="compenyBrand" />
                                        <div className="ml-10">
                                            <h1 className="text-base font-bold">{item.job}</h1>
                                            <span className="text-[#94A3B8] text-sm">{item.companyName}</span>
                                            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                                                <img src={ExperienceIcon} alt="ExperienceIcon" width="15rem" height="15rem" />
                                                <span className="ml-2">{item.experience}</span>
                                            </div>
                                            <div className="mb-3 text-[#475569] text-xs flex justify-start items-center">
                                                <img src={MoneyIcon} alt="MoneyIcon" width="15rem" height="15rem" /><span className="ml-2">{item.salary}</span>
                                            </div>
                                            <div className="mb-5 text-[#475569] text-xs flex justify-start items-center">
                                                <img src={LocationIcon} alt="LocationIcon" width="15rem" height="15rem" /><span className="ml-2">{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="p-2">
                                            <img src={BookMark} alt="BookMark" />
                                        </button>
                                        <button className="p-2">
                                            <img src={ThreeDots} alt="ThreeDots" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <PaginatedItems itemsPerPage={itemsPerPage} items={itemsForReactPaginate} itemOffset={itemOffset} setItemOffset={setItemOffset} />
                    </div>
                </div>
                <div className="bg-slate-400 col-start-11 col-end-13">
                    uahev;iorjpo
                </div>
            </div >
        </>
    )
}

export default AllJobs