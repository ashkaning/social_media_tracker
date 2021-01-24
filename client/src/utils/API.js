import axios from "axios";
export default {
    NewRol: function (role) {
        return axios.post("/api/role", role);
    },
    saveVideoCategory: function (names) {
        return axios.post("/api/videoCategory", names)
    },
    getALlVideoCategory: function(){
        return axios.get("/api/videoCategory")
    },
    saveVideo: function(info){
        return axios.post("/api/video",info)
    },
    gettAllVideos: function(){
        return axios.get("/api/video")
    }
}