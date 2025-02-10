export const storeUserDetails = (userDetails) => {
    sessionStorage.setItem('userId', userDetails._id);
}

export const getUserId = () => {
    return sessionStorage.getItem('userId');
}

export const cleanUserDetails = () => {
    sessionStorage.clear();
}