import myAxios from "../MyAxios";

const newsApi = {
    getAllInfo(params){
        return myAxios.post("admin/getallinfo",params)
    },
    addNews(params){
        return myAxios.post("admin/addnews",params)
    },
    changeNews(params){
        return myAxios.post("admin/changenews",params)
    },
    delNews(params){
        return myAxios.post("admin/delnews",params)
    }
}

export default newsApi