import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';
import { getFirstLetterOfName } from '../../utils/filterArray';
import { useAppSelector } from '../../..';
import { clearLogOutSlice, logOutUser } from '../../../store/reducers/logout';
import { useDispatch } from 'react-redux';
import PopoverHover from '../../commonComponents/PopoverHover';
import JobCategory from './JobCategory';

const Header = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('');

    const { success: loginSuccess, login } = useAppSelector((state) => state.login);
    const { success: registerSuccess, user } = useAppSelector((state) => state.register);
    const { success: logOutSuccess } = useAppSelector((state) => state.logOut);

    //let userName: string;
    const userName = Cookies.get('name');
    const token = Cookies.get('token');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (logOutSuccess) {
            dispatch(clearLogOutSlice())
            Cookies.remove("name");
            Cookies.remove("token");
            setName('')
            setAuth(false)
            navigate('/')
        }
    }, [logOutSuccess])

    useEffect(() => {
        setName(userName as any)
        setAuth(token as any)
    }, [loginSuccess, registerSuccess])

    const logout = () => {
        dispatch(logOutUser() as any);
    }

    const handlePopover = () => {
        // navigate("/home");
    }

    return (
        <nav className="h-[10%] w-full bg-[#fff] font-sans border-b border-[#E0E1E6] px-32 flex items-center justify-between box-border fixed top-0 z-50">
            <div className="flex space-x-6 items-center h-full">
                {auth ? <Link className="text-[#4F46E5] border border-[#4F46E5] p-1 rounded-md font-semibold" to="/homePage">JOB PORTAL</Link> : <Link className="text-[#4F46E5] border border-[#4F46E5] p-1 rounded-md font-semibold" to="/">JOB PORTAL</Link>}
                <div className="border border-gray-200 h-8"></div>
                {/* Navigation Link*/}
                <div className="flex space-x-6 items-center h-full">
                    <span className="text-[#312E81] h-full">
                        <PopoverHover title="Jobs" handlePopover={handlePopover} body={<JobCategory />} />
                    </span>
                    <Link to="#" className="text-[#312E81]">Companies</Link>
                    <Link to="#" className="text-[#312E81]">Services</Link>
                </div>
            </div>
            <div className="flex space-x-6 items-center">
                <div className="relative flex items-center w-80 py-2 border border-[#E0E7FF] rounded-lg overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <BiSearch className="h-5 w-5" />
                    </div>
                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.." />
                </div>
                <div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center items-center text-[#312E81] m-0 p-0.5">
                                Employer
                                <ChevronDownIcon
                                    className="ml-1 mr-1 h-5 w-5"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Duplicate
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className="border border-gray-200 h-8"></div>
                {auth && <div className='float-left'>
                    <img className='float-right' src='./ellipse32.svg' alt="image" />
                    <img src='./bell-Icons.svg' alt="image" />
                </div>}
                <div className="text-[#312E81]">

                    {auth ?
                        <>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>

                                    <Menu.Button className="inline-flex w-full justify-center items-center text-[#312E81] m-0 p-0.5">
                                        <div className="w-9 h-9 bg-green-600 text-lg text-white rounded-full pt-1">{getFirstLetterOfName(name)}</div>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => logout()}
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        Logout
                                                    </button>
                                                )}
                                            </Menu.Item>

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>


                        </> : <>
                            <Link to="/login" className=" py-2 px-3 mx-3">Log In</Link>
                            <Link to="/registration" className="rounded-lg bg-[#EEF2FF] py-2 px-3">Sign Up</Link>
                        </>
                    }
                </div>
            </div>
        </nav >
    )
}

export default Header;