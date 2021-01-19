import axios from "axios";
export default {
    NewRol: function (role) {
        return axios.post("/api/role", role);
    }

}