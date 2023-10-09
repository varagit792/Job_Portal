import { useEffect } from 'react';
import { getLocationList } from '../../utils/utils';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const FiltersLocation = ({ location, setLocation, handleLocationCheckbox }: any) => {
    useEffect(() => {
        (async () => {
            const locationList = await getLocationList();
            if (Object.keys(locationList)?.length) {
                setLocation(locationList);
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
                            <label className="text-[#475569] font-semibold">Location</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            {location?.slice(0, 5)?.map((item: any) => <div className="text-[#475569] mb-2 flex justify-start items-center">
                                <input type="checkbox" defaultChecked={false} checked={item?.isChecked} onChange={() => handleLocationCheckbox(item)} />
                                <label className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                            </div>)}
                            <button className="text-[#4F46E5]">View all...</button>
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    )
};

export default FiltersLocation;