export const isLogin = () => {
    const token = localStorage.getItem('token');
    return token != null ;
}

export const token = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    
    if(token != null ){
        return token;
    }else{
        return null;
    }
}