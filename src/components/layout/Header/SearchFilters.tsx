import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { BiSearch } from 'react-icons/bi';
import { getDepartmentList, getLocationList } from '../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../';
import {
    setDepartment,
    setLocation,
    setFilterDepartment,
    setFilterLocation,
    setSearchDepartment,
    setSearchLocation
} from '../../../store/reducers/jobs/GetFilterJobs';

const SearchFilters = () => {
    const { department, location } = useAppSelector((state) => state.getFilterJobs);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    let locationPath = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            const departmentList = await getDepartmentList();
            if (Object.keys(departmentList)?.length) {
                // setFilterDepartment(departmentList);
                dispatch(setDepartment(departmentList));
            }
        })();
        (async () => {
            const locationList = await getLocationList();
            if (Object.keys(locationList)?.length) {
                dispatch(setLocation(locationList))
            }
        })();
    }, []);

    const filteredDepartment =
        query === ''
            ? department
            : department.filter((item: any) =>
                item.title
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    const filteredLocation =
        query === ''
            ? location
            : location.filter((item: any) =>
                item.title
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    const handleDepartment = (id: number) => {
        navigate("/allJobs");
        dispatch(setDepartment(
            department?.map((item: any) =>
                item?.id === id ? { ...item, isChecked: true } : item
            )
        ));
        dispatch(setSearchDepartment(false));
        dispatch(setFilterDepartment(id));
    }

    const handleLocation = (id: number) => {
        navigate("/allJobs");
        dispatch(setLocation(
            location?.map((item: any) =>
                item?.id === id ? { ...item, isChecked: true } : item
            )
        ));
        dispatch(setSearchLocation(false));
        dispatch(setFilterLocation(id));
    }

    return (
        <div className="w-72">
            <Combobox>
                <div className="relative">
                    <div className="relative flex items-center justify-between w-full border border-[#E0E7FF] rounded-lg overflow-hidden focus:border-none">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <BiSearch className="h-5 w-5" />
                        </div>
                        <Combobox.Input
                            className="w-full border-none py-2 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                            displayValue={(item: any) => locationPath?.pathname === "/allJobs" ? item?.title : ""}
                            placeholder="Search something.."
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredDepartment.length === 0 && filteredLocation.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                <>
                                    {filteredDepartment.map((item: any) => (
                                        <Combobox.Option
                                            key={item?.id}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            onClick={() => handleDepartment(item?.id)}
                                            value={item}
                                        >
                                            <span className="font-normal w-full h-full">{item.title}</span>
                                        </Combobox.Option>
                                    ))}
                                    {filteredLocation.map((item: any) => (
                                        <Combobox.Option
                                            key={item?.id}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            onClick={() => handleLocation(item?.id)}
                                            value={item}
                                        >
                                            <span className="font-normal w-full h-full">{item.title}</span>
                                        </Combobox.Option>
                                    ))}
                                </>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchFilters;