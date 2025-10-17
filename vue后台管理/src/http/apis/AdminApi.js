import myAxios from '../MyAxios.js'

const adminApi = {
    login(params) {
        return myAxios.post("admin/login", params);
    },
}
export default adminApi