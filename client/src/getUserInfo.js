export const getUserId = () => {
  const userId = localStorage.getItem('userId')
    ? +JSON.parse(localStorage.getItem('userId'))
    : null;
  return userId;
};

export const getUserImg = () => {
  // const userImg =  localStorage.getItem('userImg') ? +JSON.parse(localStorage.getItem('userImg')) : null
};

// export const getUserName = () => {
//   const userName = localStorage.getItem('userName')
//     ? +JSON.parse(localStorage.getItem('userName'))
//     : null;
//   return userName;
// };
