import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../..';
import { clearLogOutSlice, logOutUser } from '../../../store/reducers/logout';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const SignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success:logoutSuccess } = useAppSelector((state) => state.logOut);

  useEffect(() => {
    dispatch(logOutUser());
  }, [dispatch]);

  useEffect(() => {
    if (logoutSuccess) {
      dispatch(clearLogOutSlice());
      Cookies.remove("name");
      Cookies.remove("token");
    }      
  }, [dispatch, logoutSuccess]);


  useEffect(() => {
    if (logoutSuccess) {
      Cookies.remove('token');
      Cookies.remove('name');
      navigate('/login');
    }
  },[logoutSuccess])

  return (<>
  </>)
}

export default SignOut