import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import verifiedProfile from '../../../../assets/svg/verifiedProfile.svg';
import { BsBriefcase } from 'react-icons/bs';
import { BiSolidToggleLeft, BiSolidToggleRight } from 'react-icons/bi';

const TotalJobs = () => {

    return (
        <div className="w-full mb-10">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-start items-center font-bold">
                            <label className="text-xl mr-2 leading-none">Total Jobs</label>
                            <ChevronUpIcon
                                className={`${open ? 'rotate-180 transform' : ''
                                    } h-6 w-6 text-[#312E81]`}
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            <div className="grid grid-cols-4 gap-5">
                                <div className="bg-[#EEF2FF] rounded-xl p-5">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs">Posted</span>
                                        <button className="rounded-full p-2 bg-[#EEF2FF] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)]">
                                            <BsBriefcase className="text-[#6366F1]" />
                                        </button>
                                    </div>
                                    <h1 className="text-lg font-bold">35</h1>
                                </div>
                                <div className="bg-[#FBEEFF] rounded-xl p-5">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs">Active</span>
                                        <button className="rounded-full p-2 bg-[#FBEEFF] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)]">
                                            <BiSolidToggleRight className="text-[#AC46CB]" />
                                        </button>
                                    </div>
                                    <h1 className="text-lg font-bold">22</h1>
                                </div>
                                <div className="bg-[#FFEEF9] rounded-xl p-5">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs">Paused</span>
                                        <button className="rounded-full p-2 bg-[#FFEEF9] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)]">
                                            <BiSolidToggleLeft className="text-[#CE2D95]" />
                                        </button>
                                    </div>
                                    <h1 className="text-lg font-bold">4</h1>
                                </div>
                                <div className="bg-[#FEE] rounded-xl p-5">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs">Hired</span>
                                        <button className="rounded-full p-2 bg-[#FEE] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)]">
                                            <img src={verifiedProfile} alt="verifiedProfile" width="15rem" height="15rem" />
                                        </button>
                                    </div>
                                    <h1 className="text-lg font-bold">9</h1>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default TotalJobs;