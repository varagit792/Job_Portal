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
import ellipse32 from '../../../assets/svg/ellipse32.svg';
import bell_Icons from '../../../assets/svg/bellIcons.svg';
import JobSeekerHeader from './JobSeekerHeader';
import EmployerHeader from './EmployerHeader';

const Header = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('');
    const [userType, setUserType] = useState('');

    const { success: loginSuccess, login } = useAppSelector((state) => state.login);
    const { success: registerSuccess, user } = useAppSelector((state) => state.register);
    const { success: logOutSuccess } = useAppSelector((state) => state.logOut);

    //let userName: string;
    const userName = Cookies.get('name');
    const userTypes = Cookies.get('userType');
    const token = Cookies.get('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(userTypes);

    useEffect(() => {
        if (logOutSuccess) {
            dispatch(clearLogOutSlice())
            Cookies.remove("name");
            Cookies.remove("userType");
            Cookies.remove("token");
            setName('')
            setAuth(false)
            navigate('/')
        }
    }, [logOutSuccess])

    useEffect(() => {
        setName(userName as any);
        setUserType(userTypes as any)
        setAuth(token as any)
    }, [loginSuccess, registerSuccess])

    const logout = () => {
        dispatch(logOutUser() as any);
    }

    return (
        <>
            {(userType === 'jobSeeker' || userType === undefined) && <JobSeekerHeader auth={auth} name={name} logout={logout} />}
            {userType === 'employer' && <EmployerHeader auth={auth} name={name} logout={logout} />}
        </>
    )
}

export default Header;