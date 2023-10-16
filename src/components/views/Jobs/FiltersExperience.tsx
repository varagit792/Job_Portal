import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { getTotalYearsExpList } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../';
import { setExpYears, setMaxExpYearId } from '../../../store/reducers/jobs/GetFilterJobs';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Select from 'react-select';

export const ExperienceBasedFilter = ({ handleTotalExpYearChange, isOpen }: any) => {
    const dispatch = useAppDispatch();
    const { filtersData } = useAppSelector((state) => state.getFilterJobs);
    const [totalExpYear, setTotalExpYear] = useState<number>(0);
    useEffect(() => {
        (async () => {
            const experienceYearsList = await getTotalYearsExpList();
            if (Object.keys(experienceYearsList)?.length) {
                dispatch(setExpYears(experienceYearsList));
            }
        })();
    }, []);
    useEffect(() => {
        if (filtersData?.expYear !== null && !isOpen) {
            setTotalExpYear(filtersData?.expYear);
        }
    }, [!isOpen]);
    return (
        <div className="w-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Experience</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-12">
                            <div className="relative mb-3">
                                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center"
                                    style={{
                                        left: `${totalExpYear * 2}%`
                                    }}>
                                    {totalExpYear}
                                </span>
                                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]" type="range" min="0" max="50"
                                    value={totalExpYear}
                                    onMouseUp={() => handleTotalExpYearChange(totalExpYear)}
                                    onChange={(event: React.FormEvent<HTMLInputElement> | any) => {
                                        setTotalExpYear(parseInt(event.target.value));
                                    }} />
                            </div>
                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                <span>0 Yrs</span>
                                <span>30+ Yrs</span>
                            </div>
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
};

const FiltersExperience = () => {
    const dispatch = useAppDispatch();
    const { expYear, maxExpYearId } = useAppSelector((state) => state.getFilterJobs);
    const [expYearMaster, setExpYearMaster] = useState([]);
    const [totalExpYear, setTotalExpYear] = useState<number>(0);

    useEffect(() => {
        setExpYearMaster(expYear?.map(({ id, title }: any) => ({ value: id, label: title })));
        if (maxExpYearId !== null && maxExpYearId !== 0) {
            const experienceYearsData = expYear?.filter((item: any) => parseInt(item?.id) === maxExpYearId);
            let data = experienceYearsData[0]?.title?.split('');
            setTotalExpYear(parseInt(data?.slice(0, data.length - 5).join('')));
        }
    }, []);

    const handleTotalExpYearChange = (totalExpYear: number) => {
        dispatch(setMaxExpYearId(totalExpYear));
    };

    return (
        <div className="w-full px-5">
            <h1 className="font-semibold leading-none mt-5 mb-12 text-lg">Experience required</h1>
            <div className="relative mb-3">
                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center"
                    style={{
                        left: `${totalExpYear * 2}%`
                    }}>
                    {totalExpYear}
                </span>
                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]" type="range" min="0" max="50"
                    value={totalExpYear}
                    onMouseUp={() => handleTotalExpYearChange(totalExpYear)}
                    onChange={(event: React.FormEvent<HTMLInputElement> | any) => {
                        setTotalExpYear(parseInt(event.target.value));
                    }} />
            </div>
            <div className="flex justify-between items-center text-[#64748B] text-xs mb-3">
                <span>0 Yrs</span>
                <span>30+ Yrs</span>
            </div>
            <div>
                <h1 className="text-[#64748B] text-xs mb-3">Max experience</h1>
                <Select
                    isClearable
                    isSearchable={true}
                    className="text-sm w-1/2"
                    classNamePrefix="dropdown"
                    options={expYearMaster}
                />
            </div>
        </div>
    )
};

export default FiltersExperience;