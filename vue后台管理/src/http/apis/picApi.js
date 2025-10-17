import myAxios from '../MyAxios.js'

const picApi = {
    getAllList(params){
        return myAxios.post("admin/getalllist",params)
    },
    addList(params){
        return myAxios.post("admin/addlist",params)
    },
    changeList(params){
        return myAxios.post("admin/changeList",params)
    },
    delList(params){
        return myAxios.post('admin/dellist',params)
    }
}
export default picApi