import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx';
import FiltersDepartment from './FiltersDepartment';

const FiltersModal = ({ isOpen, setIsOpen }: any) => {
    const closeDialog = () => {
        setIsOpen(false);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-lg font-medium text-gray-900 text-right flex justify-between items-center p-5">
                                    <h1 className="font-bold leading-none">Filters</h1>
                                    <button
                                        onClick={closeDialog}
                                        type="button"
                                        className="outline-0"
                                    >
                                        <RxCross1 />
                                    </button>
                                </Dialog.Title>
                                <div className="grid grid-cols-12 border-y border-[#E0E7FF]">
                                    <div className="col-start-1 col-end-4 border-r border-[#E0E7FF]">
                                        <ul>
                                            <li className="bg-[#F1F5F9] px-5 py-2">Experience</li>
                                            <li className="px-5 py-2">Department</li>
                                            <li className="px-5 py-2">Location</li>
                                            <li className="px-5 py-2">Work mode</li>
                                            <li className="px-5 py-2">Salary</li>
                                            <li className="px-5 py-2">Company type</li>
                                            <li className="px-5 py-2">Role category</li>
                                            <li className="px-5 py-2">Posted by</li>
                                            <li className="px-5 py-2">Industry</li>
                                            <li className="px-5 py-2">Top companies</li>
                                            <li className="px-5 py-2">Posting date</li>
                                        </ul>
                                    </div>
                                    <div className="col-start-4 col-end-13">
                                        <FiltersDepartment />
                                    </div>
                                </div>
                                <div className="p-5 float-right">
                                    <button className="text-[#312E81] bg-[#EEF2FF] px-8 py-2 rounded-lg text-sm mr-5">Close</button>
                                    <button className="text-white bg-[#4F46E5] px-8 py-2 rounded-lg text-sm">Apply</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default FiltersModal;