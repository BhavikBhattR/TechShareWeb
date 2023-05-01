// API_NOTIFICATION_MESSAGES



export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded, please wait..',
    },
    success:{
        title: 'Success',
        message: 'Data loaded successfully'
    },
    responseFailure: {
        title: 'Error',
        message: 'Error while fetching response from the server, please try again'
    },
    requestFailure: {
        title: 'Error',
        message: 'Error while parsing request data'
    },
    networkError:{
        title: 'Error',
        message: 'Unable to connect to the server, please check internet connection and try again later'
    }
}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogIn: {url: '/login', method: 'POST'}
}