import axios from "axios"
export const useServer = () => {
    const fetchAllData = async (url) => {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            const response = await res.data.data
            return  response
        } catch (e){
            alert(e.message)
        }
    }

    const fetchDataById = async (url, id) => {
        try {
            const res = await axios.get(url + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            if(res.status === 200){
                return await res.data
            }
        } catch (e) {
            alert(e.message);
        }
    }

    const addData = async (url, data) => {
        try {
            const res = await axios.post(url, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            if(res.status === 201){
                return res
            }
        } catch (e) {
            alert(e.message);
        }
    }
    const editData = async (url, id, data) => {
        try {
            const res = await axios.put(url + id, data, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            if(res.status === 200){
                return res
            }
        } catch (e) {
            alert(e.message);
        }
    }

    const deleteData = async (url, id) => {
        try {
            const res = await axios.delete(url + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            if(res.status === 204){
                return res
            }
        } catch (e) {
            alert(e.message);
        }
    }

    return { fetchAllData, fetchDataById, addData, editData, deleteData };
};