import axiosConfig from '../axiosConfig'

export const apiGetCategories = () => new Promise(async(resolve , reject)=>{
    try {
        const reponse = await axiosConfig({
            method:'get',
            url:'/api/v1/category/all',
        });
        resolve(reponse);
    } catch (error) {
        reject(error)
    }
})
