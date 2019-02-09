export const APP_CONSTANTS={
    Messages:{
        SUCCESS: "Success",
        ERROR : "Error"
    },
    gender : ['M','F'],
    MessageColors:
    {
        Success:'green',
        Error:'red'
    },
    APIConfig:{
        APIURL : 'http://192.168.137.1:7575',
        Services:
        {
            Registration :
            {
                Actions:
                {
                    login:'/getuser',
                    register:'/adduser',
                    getAll:'/getAll',
                    update:'/update',
                    delete:'/delete',
                    upload:'/upload'
                }
            }
        }
    }
} 
