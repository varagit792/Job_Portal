import { useEffect } from 'react';
import { getWorkModeList } from '../../utils/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const FiltersWorkMode = ({ workMode, setWorkMode, handleWorkModeCheckbox }: any) => {
    useEffect(() => {
        (async () => {
            const workModeList = await getWorkModeList();
            if (Object.keys(workModeList)?.length) {
                setWorkMode(workModeList);
            }
        })();
    }, [])
    return (
        <div className="w-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Work Mode</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            {workMode?.map((item: any, index: number) => <div className={workMode.length - 1 !== index ? "text-[#475569] flex justify-start items-center mb-2" : "text-[#475569] flex justify-start items-center"}>
                                <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleWorkModeCheckbox(item)} />
                                <label className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                            </div>)}
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
};

export default FiltersWorkMode;