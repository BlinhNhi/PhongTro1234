import axiosConfig from '../axiosConfig'

export const apiRegister = (payload) => new Promise(async(resolve , reject)=>{
    try {
        const reponse = await axiosConfig({
            method:'post',
            url:'/api/v1/auth/register',
            data:payload
        });
        resolve(reponse);
    } catch (error) {
        reject(error)
    }
})


export const apiLogin = (payload) => new Promise(async(resolve , reject)=>{
    try {
        const reponse = await axiosConfig({
            method:'post',
            url:'/api/v1/auth/login',
            data:payload
        });
        resolve(reponse);
    } catch (error) {
        reject(error)
    }
})
