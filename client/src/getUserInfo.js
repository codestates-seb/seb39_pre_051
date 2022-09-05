export const getUserId = () => {
    const userId = localStorage.getItem('useId') ? +JSON.parse(localStorage.getItem('useId')) : null
    return userId
}

export const getUserImg = () => {
    // const userImg =  localStorage.getItem('userInfo') ? +JSON.parse(localStorage.getItem('userInfo')) : null
}