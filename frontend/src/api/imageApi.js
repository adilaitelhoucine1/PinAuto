import axiosClient from './axiosClient';

export async function uploadImages(files) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }
  const response = await axiosClient.post('/api/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function getImages() {
  const response = await axiosClient.get('/api/images');
  return response.data;
}

export async function deleteImage(id) {
  const response = await axiosClient.delete(`/api/images/${id}`);
  return response.data;
}
