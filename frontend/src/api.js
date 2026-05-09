import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/',
  timeout: 25000,
});

export const fetchProfile = () => API.get('profile/').then(r => r.data);
export const fetchAchievements = () => API.get('achievements/').then(r => r.data);
export const fetchContributions = () => API.get('contributions/').then(r => r.data);
export const fetchGitHubRepos = () =>
  axios.get('https://api.github.com/users/Kishan0507/repos', {
    params: { per_page: 30, sort: 'updated' },
    headers: { 'User-Agent': 'Kishan0507-Portfolio-App' },
    timeout: 15000,
  }).then(r => r.data);

export default API;
