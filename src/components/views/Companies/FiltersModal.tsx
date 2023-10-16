import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross1 } from 'react-icons/rx';
import FiltersDepartment from './CompanyDepartmentFilter';
import { useAppDispatch, useAppSelector } from '../../../';
import {
    bulkFilter,
    setNavigateFilterOption,
    setDepartment,
    //setLocation,
    //setWorkMode
} from '../../../store/reducers/companies/getAllCompanies';
//import FiltersLocation from './FiltersLocation';
//import FiltersWorkMode from './FiltersWorkMode';
//import FiltersExperience from './FiltersExperience';

const FiltersModal = ({ isOpen, setIsOpen, setToggleDispach }: any) => {
    const dispatch = useAppDispatch();
    const { navigateFilterOption, checkItems, departmentIds,
        //locationIds, workModeIds, maxExpYearId
    } = useAppSelector((state) => state.getAllCompanies);

    const closeDialog = () => {
        setIsOpen(false);
    };

    const handleSubmit = () => {
        setToggleDispach(true);
        dispatch(bulkFilter({
            department: departmentIds,
            //location: locationIds,
            //workMode: workModeIds,
            //expYear: maxExpYearId
        }));
        dispatch(setDepartment(checkItems?.department));
        //dispatch(setLocation(checkItems?.location));
        //dispatch(setWorkMode(checkItems?.workMode));
        setIsOpen(false);
    }

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
                                            <li
                                                className={navigateFilterOption !== "Experience" ?
                                                    "px-5 py-2 cursor-pointer flex justify-between items-center"
                                                    : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                                                onClick={() => dispatch(setNavigateFilterOption("Experience"))}>
                                                Experience
                                            </li>
                                            <li
                                                className={navigateFilterOption !== "Department" ?
                                                    "px-5 py-2 cursor-pointer flex justify-between items-center"
                                                    : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                                                onClick={() => dispatch(setNavigateFilterOption("Department"))}>
                                                <span>Department</span>
                                                {departmentIds?.length !== 0 &&
                                                    <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                                                        {departmentIds?.length}
                                                    </span>}
                                            </li>
                                            {/* <li
                                                className={navigateFilterOption !== "Location" ?
                                                    "px-5 py-2 cursor-pointer flex justify-between items-center"
                                                    : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                                                onClick={() => dispatch(setNavigateFilterOption("Location"))}>
                                                <span>Location</span>
                                                {locationIds?.length !== 0 &&
                                                    <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                                                        {locationIds?.length}
                                                    </span>}
                                            </li> */}
                                            {/* <li
                                                className={navigateFilterOption !== "Work mode" ?
                                                    "px-5 py-2 cursor-pointer flex justify-between items-center"
                                                    : "bg-[#F1F5F9] px-5 py-3 cursor-pointer flex justify-between items-center"}
                                                onClick={() => dispatch(setNavigateFilterOption("Work mode"))}>
                                                <span>Work mode</span>
                                                {workModeIds?.length !== 0 &&
                                                    <span className="bg-[#F1F5F9] rounded-full w-8 h-8 flex justify-center items-center">
                                                        {workModeIds?.length}
                                                    </span>}
                                            </li> */}
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Salary"))}>Salary</li>
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Company type"))}>Company type</li>
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Role category"))}>Role category</li>
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Posted by"))}>Posted by</li>
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Industry"))}>Industry</li>
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Top companies"))}>Top companies</li>
                                            <li className="px-5 py-2" onClick={() => dispatch(setNavigateFilterOption("Posting date"))}>Posting date</li>
                                        </ul>
                                    </div>
                                    <div className="col-start-4 col-end-13">
                                        {/* {navigateFilterOption === "Experience" && <FiltersExperience />} */}
                                        {navigateFilterOption === "Department" && <FiltersDepartment />}
                                        {/* {navigateFilterOption === "Location" && <FiltersLocation />} */}
                                        {/* {navigateFilterOption === "Work mode" && <FiltersWorkMode />} */}
                                    </div>
                                </div>
                                <div className="p-5 float-right">
                                    <button className="text-[#312E81] bg-[#EEF2FF] px-8 py-2 rounded-lg text-sm mr-5" onClick={closeDialog}>Close</button>
                                    <button className="text-white bg-[#4F46E5] px-8 py-2 rounded-lg text-sm" onClick={handleSubmit} >Apply</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}

export default FiltersModal;