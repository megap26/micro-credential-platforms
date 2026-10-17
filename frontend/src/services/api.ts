const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('skillpulse_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err: any) {
    console.error(`API Error [${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth
  register: (body: any) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: any) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => apiRequest('/auth/me'),
  updateProfile: (body: any) => apiRequest('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),

  // Skills & Intelligence
  getSkills: (params?: string) => apiRequest(`/skills${params ? `?${params}` : ''}`),
  getSkillAnalytics: (role?: string) => apiRequest(`/skills/analytics${role ? `?role=${encodeURIComponent(role)}` : ''}`),
  extractSkills: (text: string) => apiRequest('/skills/extract', { method: 'POST', body: JSON.stringify({ jobDescriptionText: text }) }),
  analyzeGap: (targetRole: string, currentSkills: any[]) =>
    apiRequest('/skills/gap-analysis', { method: 'POST', body: JSON.stringify({ targetRole, currentSkills }) }),

  // Curricula
  generateCurriculum: (body: any) => apiRequest('/curricula/generate', { method: 'POST', body: JSON.stringify(body) }),
  saveCurriculum: (curriculum: any) => apiRequest('/curricula/save', { method: 'POST', body: JSON.stringify(curriculum) }),
  getUserCurricula: () => apiRequest('/curricula'),
  getCurriculumById: (id: string) => apiRequest(`/curricula/${id}`),
  updateCurriculum: (id: string, body: any) => apiRequest(`/curricula/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  realignCurriculum: (id: string) => apiRequest(`/curricula/${id}/realign`, { method: 'POST' }),

  // Learning Progress
  getProgress: (curriculumId: string) => apiRequest(`/learning/${curriculumId}`),
  updateModule: (curriculumId: string, body: any) =>
    apiRequest(`/learning/${curriculumId}/module`, { method: 'POST', body: JSON.stringify(body) }),

  // Assessments
  getAssessment: (curriculumId: string) => apiRequest(`/assessments/curriculum/${curriculumId}`),
  submitAssessment: (assessmentId: string, userAnswers: any[], timeSpentSeconds: number) =>
    apiRequest(`/assessments/${assessmentId}/submit`, { method: 'POST', body: JSON.stringify({ userAnswers, timeSpentSeconds }) }),

  // Credentials
  issueCredential: (curriculumId: string) =>
    apiRequest('/credentials/issue', { method: 'POST', body: JSON.stringify({ curriculumId }) }),
  getMyCredentials: () => apiRequest('/credentials/my-credentials'),
  getCredential: (id: string) => apiRequest(`/credentials/public/${id}`),
  verifyCredential: (credentialId: string) => apiRequest(`/credentials/verify/${encodeURIComponent(credentialId)}`),

  // Admin & Reviewer
  getAdminStats: () => apiRequest('/admin/stats'),
  getJobPostings: (params?: string) => apiRequest(`/admin/job-postings${params ? `?${params}` : ''}`),
  addJobPosting: (body: any) => apiRequest('/admin/job-postings', { method: 'POST', body: JSON.stringify(body) }),
  addReview: (curriculumId: string, body: any) =>
    apiRequest(`/admin/curricula/${curriculumId}/review`, { method: 'POST', body: JSON.stringify(body) }),
  getReviews: (curriculumId: string) => apiRequest(`/admin/curricula/${curriculumId}/reviews`),
};
