import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchTask, updateTask } from '../../src/utils/taskService';

vi.mock('axios');

describe('Task Service', () => {
  const apiUrl = process.env.VUE_APP_API_URL;

  describe('fetchTask', () => {
    it('should fetch a task by ID', async () => {
        const mockTask = { id: 1, title: 'Test Task', description: 'This is a test task' };
        axios.get.mockResolvedValue({ data: mockTask });
  
        const task = await fetchTask(1);
  
        expect(axios.get).toHaveBeenCalledWith(`${apiUrl}/tasks/1`);
        expect(task).toEqual(mockTask);
    });

    it('should throw an error for invalid ID', async () => {
      await expect(fetchTask(-1)).rejects.toThrow('Invalid task ID provided. ID must be a positive number.');
      await expect(fetchTask('a')).rejects.toThrow('Invalid task ID provided. ID must be a positive number.');
    });
  });

  describe('updateTask', () => {
    it('should update a task by ID', async () => {
      const updatedTask = { title: 'Updated Task', description: 'Updated description' };
      axios.put.mockResolvedValue({});

      await updateTask(1, updatedTask);

      expect(axios.put).toHaveBeenCalledWith(`${apiUrl}/tasks/1`, updatedTask);
    });

    it('should throw an error for invalid ID', async () => {
        await expect(updateTask(-1, { title: 'Test' })).rejects.toThrow('Invalid task ID provided. ID must be a positive number.');
        await expect(updateTask('a', { title: 'Test' })).rejects.toThrow('Invalid task ID provided. ID must be a positive number.');
    });

    it('should throw an error for invalid updated task data', async () => {
        await expect(updateTask(1, null)).rejects.toThrow('Invalid updated task data provided.');
        await expect(updateTask(1, 'string')).rejects.toThrow('Invalid updated task data provided.');
        await expect(updateTask(1, [])).rejects.toThrow('Invalid updated task data provided.');
    });
  });

});
