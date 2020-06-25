import http from "../http-common";

const get = id => {
    return http.get(`/assignment/${id}`);
};

const create = data => {
    return http.post('/assignment/', data);
};

const update = (id, data) => {
    return http.put(`/assignment/${id}`, data);
};

const remove = id => {
    return http.delete(`/assignment/${id}`);
};

export default {
    get,
    create,
    update,
    remove,
};