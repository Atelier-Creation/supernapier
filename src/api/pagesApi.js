import api from './authApi';

export const pagesApi = {
  getPageContent: (pageId) => api.get(`/pages/${pageId}`),
};
