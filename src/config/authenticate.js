import Axios from 'axios';
import { useState, useEffect } from 'react';

// check for session user token on local storage
const useAuthenticated = function() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
      if(localStorage.getItem('token') !== null){
        Axios.get('https://hidden-river-10555.herokuapp.com/api/auth', {
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`,
          }
        }).then(response => {
            response.data.auth ? setAuth(true) : setAuth(false);
        })
      }else{
          setAuth(false);
      }
  },[])

  return auth;
}

export default useAuthenticated;