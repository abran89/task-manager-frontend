import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { handleCreateTask } from '../utils/taskService';

vi.mock('axios');

describe('Task Creation', () => {

  const apiUrl = process.env.VUE_APP_API_URL; 
  
  it('should create a new task successfully', async () => {
    const newTask = { title: 'New Task', description: 'This is a test task' };
    axios.post.mockResolvedValue({ data: { message: 'Task created successfully!' } });

    await handleCreateTask(newTask);

    expect(axios.post).toHaveBeenCalledWith(`${apiUrl}/tasks`, newTask);
  
  });

  it('should handle task creation error', async () => {
    axios.post.mockRejectedValue(new Error('Network error'));

    try {
      await handleCreateTask({});
    } catch (error) {
      expect(error.message).toBe('Title is required.');
    }
  });
});
