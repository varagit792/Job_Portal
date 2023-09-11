import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../..';
import { clearLogOutSlice, logOutUser } from '../../../store/reducers/logout';

const SignOut = () => {
  const dispatch = useAppDispatch();
  const { success, logout } = useAppSelector((state) => state.getLogout);

  useEffect(() => {
    dispatch(logOutUser());


  }, [dispatch]);

  useEffect(() => {
    if (success)
      dispatch(clearLogOutSlice());


  }, [dispatch, success]);

  console.log("logOutUser", logOutUser);


  return (
    <div>SignOut</div>
  )
}

export default SignOut