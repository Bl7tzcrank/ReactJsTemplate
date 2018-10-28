import axios from 'axios';

export const signInAction = (data) => {
    return new Promise(function(resolve, reject){
      axios.post('/users/authenticate', {
        username: data.username,
        password: data.password
      })
      .then(res => {
        resolve(res);
      })
      .catch(function (err) {
        reject(err);
      })
    })
}

export const signOutAction = () => {
    localStorage.clear();
}

export const authorized = () => {
  if(JSON.parse(localStorage.getItem('loggedin'))){
    return true;
  }else{
    return false;
  }
}