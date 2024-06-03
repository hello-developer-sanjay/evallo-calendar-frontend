// src/hooks/useAuth.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadUser } from '../actions/authActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading, isAuthenticated } = useSelector(state => state.auth);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userParam = query.get('user');
    const tokenParam = query.get('token');

    if (userParam) {
      const userFromUrl = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem('user', JSON.stringify(userFromUrl));
      if (tokenParam) {
        localStorage.setItem('token', tokenParam);
      }
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userFromUrl, token: tokenParam } });
    } else if (!isAuthenticated && localStorage.getItem('user') && localStorage.getItem('token')) {
      const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
      const tokenFromLocalStorage = localStorage.getItem('token');
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: { user: userDataFromLocalStorage, token: tokenFromLocalStorage } });
    } else {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, location.search]);

  return { user, loading, isAuthenticated, token };
};

export default useAuth;
