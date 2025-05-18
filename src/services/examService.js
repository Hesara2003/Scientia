import api from './api';

export const getAllExams = async () => {
  try {
    const response = await api.get('/exams');
    return response.data;
  } catch (error) {
    console.error('Error fetching exams:', error);
    throw error;
  }
};

export const getExam = async (id) => {
  try {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exam with ID ${id}:`, error);
    throw error;
  }
};

export const createExam = async (examData) => {
  try {
    const response = await api.post('/exams', examData);
    return response.data;
  } catch (error) {
    console.error('Error creating exam:', error);
    throw error;
  }
};

export const updateExam = async (id, examData) => {
  try {
    const response = await api.put(`/exams/${id}`, examData);
    return response.data;
  } catch (error) {
    console.error(`Error updating exam with ID ${id}:`, error);
    throw error;
  }
};

export const deleteExam = async (id) => {
  try {
    const response = await api.delete(`/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting exam with ID ${id}:`, error);
    throw error;
  }
};