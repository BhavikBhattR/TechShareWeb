import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config.js';
import { getAccessToken, getType  } from '../utils/common-utils.js';

const URL = 'http://localhost:8000'

const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 20000,
    headers: {  
        //application/json
        "Content-Type": "multipart/form-data"
    }
})

axiosInstance.interceptors.request.use(
    function (config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
            console.log(config.url, 'config url')
        }
        return config;
    },
    function (error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response){
        // loading over
        return processResponse(response);
    },
    function (error){
        // loading over
        return Promise.reject(processError(error))
    }

)

//////////////////////////////// (If request is successful)
// {isSuccess: true, data: object}

//----------------------------------------

////////////////////////////////
// {isFailure: true, status: String, msg: String, code: Int}

const processResponse = (response) =>{
    if(response?.status === 200){
        return {isSuccess: true, data: response.data}
    }else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if(error.response){
        // response was received but the task we wanted to perform using backend wasn't successful
        console.log('Error in RESPONSE', error.toJSON())
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){
        // Request made but no response was received
        console.log('Error in REQUEST', error.toJSON())
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }else{
        // Even request is not made but error is triggered while trying to generate request
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {}


for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] =  (body, showUploadProgress, showDownloadProgress) => {
    
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers:{
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let precentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(precentageCompleted)
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let precentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(precentageCompleted)
                }
            }
        })
    }
}

export {API}; 