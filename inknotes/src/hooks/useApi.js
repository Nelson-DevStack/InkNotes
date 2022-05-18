import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({

  get: async (url) => {
    const res = await api.get(url);
    const data = await res.data;
    return data;
  },
  
  getAll: async () => {
    const res = await api.get('/notes');
    const data = await res.data;
    return data;
  },

  getById: async (id) => {
    const res = await api.get(`/note/${id}`);
    const data = await res.data;
    return data;
  },

  create: async (title, description, text) => {
    const res = await api.post('/note', {
      title,
      description,
      text,
    });
    const data = await res.data;
    return data;
  },

  update: async (id, title, description, text) => {
    const res = await api.put(`/note/`, {
      id, title, description, text
    });
    const data = await res.data;
    return data;
  },

  delete: async (id) => {
    const res = await api.delete(`/note/${id}`);
    const data = await res.data;
    return data;
  },

});