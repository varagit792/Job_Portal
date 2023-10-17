import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { getRoleCategoryList } from '../../utils/utils';
import { useAppSelector, useAppDispatch } from '../../../';
import { setRoleCategory } from '../../../store/reducers/jobs/GetFilterJobs';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const FiltersRoleCategory = ({ handleRoleCategoryCheckbox }: any) => {

    const dispatch = useAppDispatch();
    const { roleCategory } = useAppSelector((state) => state.getFilterJobs);

    useEffect(() => {
        (async () => {
            const roleCategoryList = await getRoleCategoryList();
            if (Object.keys(roleCategoryList)?.length) {
                dispatch(setRoleCategory(roleCategoryList));
            }
        })();
    }, []);

    return (
        <div className="w-full">
            <Disclosure>
                {({
                    open
                }) => <>
                        <Disclosure.Button className="flex w-full justify-between items-center">
                            <label className="text-[#475569] font-semibold">Role Category</label>
                            <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-600`} />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-5">
                            {roleCategory?.slice(0, 5)?.map((item: any) => <div className="text-[#475569] mb-2 flex justify-start items-center">
                                <input type="checkbox" defaultChecked={false} checked={item?.isChecked !== undefined && item?.isChecked} onChange={() => handleRoleCategoryCheckbox(item)} />
                                <label className="ml-2 overflow-hidden inline-block whitespace-nowrap text-ellipsis">{item?.title}</label>
                            </div>)}
                            <button className="text-[#4F46E5]">
                                View all...
                            </button>
                        </Disclosure.Panel>
                    </>}
            </Disclosure>
        </div>
    );
}

export default FiltersRoleCategory;