import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const FiltersSalary = ({ handleSalaryFilter }: any) => {
    const [salary, setSalary] = useState<number>(0);
    return (
        <div className="w-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Salary</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-12">
                            <div className="relative mb-3">
                                <span id="inputRangeSelector" className="bg-[#C7D2FE] w-10 text-xs h-10 rounded-full text-[#312E81] absolute -top-1 -translate-y-full -translate-x-1/2 leading-none cursor-pointer after:content-normal after:border-t-[18px] after:border-t-[#C7D2FE] after:border-l-[17px] after:border-l-white after:border-r-[17px] after:border-r-white after:absolute after:top-[80%] after:left-1/2 after:-translate-x-1/2 flex justify-center items-center"
                                    style={{
                                        left: `${salary}%`
                                    }}>
                                    {salary}LPA
                                </span>
                                <input className="w-full h-1 rounded-lg cursor-pointer overflow-hidden appearance-none bg-[#C7D2FE]" type="range" min="0" max="100"
                                    value={salary}
                                    onMouseUp={() => handleSalaryFilter(salary)}
                                    onChange={(event: React.FormEvent<HTMLInputElement> | any) => {
                                        setSalary(parseInt(event.target.value));
                                    }} />
                            </div>
                            <div className="flex justify-between items-center text-[#64748B] text-xs">
                                <span>4 LPA</span>
                                <span>50+ LPA</span>
                            </div>
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
};

export default FiltersSalary;