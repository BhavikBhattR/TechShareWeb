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


//Need service call : {url: '/', method: 'POST,PUT,GET,DELETE', params: true/false, query: true/false}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogIn: {url: '/login', method: 'POST'},
    userFileUpload: {url: 'file/upload', method: 'POST'},
    createPost: {url: '/create', method: 'POST'},
    getPosts: {url: '/posts', method: 'POST'},
    getPostById: {url: '/post', method: 'GET', query: true},
    updatePost: {url: '/update', method: 'PUT', query: true},
    deletePost: {url: '/delete', method: 'DELETE', query: true},
    newComment: {url: '/comment/new', method: 'POST'},
    getAllComments: {url: '/comments', method: 'GET', query: true},
    removeComment: {url: '/comment/delete', method: 'DELETE', query: true}
} 