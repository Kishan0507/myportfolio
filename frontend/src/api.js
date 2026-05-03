import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/',
  timeout: 10000,
});

export const fetchProfile = () => API.get('profile/').then(r => r.data);
export const fetchAchievements = () => API.get('achievements/').then(r => r.data);
export const fetchContributions = () => API.get('contributions/').then(r => r.data);
export const fetchGitHubRepos = () => API.get('github-repos/').then(r => r.data);

export default API;
