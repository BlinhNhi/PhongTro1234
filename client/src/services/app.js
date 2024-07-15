import axiosDefault from 'axios'
import axios from "../axiosConfig";

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const reponse = await axios({
            method: "GET",
            url: "/api/v1/price/all"
        })
        resolve(reponse)
    } catch (error) {
        reject(error);
    }
})

export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const reponse = await axios({
            method: "GET",
            url: "/api/v1/area/all"
        })
        resolve(reponse)
        // console.log(reponse);
    } catch (error) {
        reject(error);
    }
})

export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const reponse = await axios({
            method: "GET",
            url: "/api/v1/province/all"
        })
        resolve(reponse)
        // console.log(reponse);
    } catch (error) {
        reject(error);
    }
})

export const apiGetProvincesPublic = () => new Promise(async (resolve, reject) => {
    try {
        const reponse = await axiosDefault({
            method: "GET",
            url: " https://vapi.vnappmob.com/api/province/"
        })
        resolve(reponse)
        // console.log(reponse);
    } catch (error) {
        reject(error);
    }
})

export const apiGetDistrictPublic = (proviceID) => new Promise(async (resolve, reject) => {
    try {
        const reponse = await axiosDefault({
            method: "GET",
            url: `https://vapi.vnappmob.com/api/province/district/${proviceID}`
        })
        resolve(reponse)
        // console.log(reponse);
    } catch (error) {
        reject(error);
    }
})