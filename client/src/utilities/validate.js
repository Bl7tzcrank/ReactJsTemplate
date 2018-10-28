export const validateUser = (user) => {
  if(user.username === '' || user.username === null || user.password === '' || user.password === null){
    return false;
  }else{
    return true;
  }
}