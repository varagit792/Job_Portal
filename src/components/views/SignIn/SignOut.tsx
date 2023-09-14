import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../..';
import { clearLogOutSlice, logOutUser } from '../../../store/reducers/logout';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const SignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, logoutUser } = useAppSelector((state) => state.logOut);

  useEffect(() => {
    dispatch(logOutUser());
  }, [dispatch]);

  useEffect(() => {
    if (success)
      dispatch(clearLogOutSlice());
  }, [dispatch, success]);


  if (logoutUser) {
    Cookies.remove('token');
    localStorage.removeItem("token");
    localStorage.removeItem("Name");
    navigate('/login');
    window.location.reload();
  }

  return (<>
  </>)
}

export default SignOut