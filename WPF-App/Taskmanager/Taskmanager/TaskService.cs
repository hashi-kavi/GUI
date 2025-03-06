using System.Collections.Generic;
using System.Linq;
using Taskmanager;

namespace Taskmanager
{
    public class TaskService
    {
        private readonly TaskDbContext _context;

        public TaskService()
        {
            _context = new TaskDbContext();
        }

        // Add a new task to the database
        public void AddTask(Mytasks task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
        }

        // Get all tasks from the database
        public List<Mytasks> GetAllTasks()
        {
            return _context.Tasks.ToList();
        }

        // Update an existing task
        public void UpdateTask(Mytasks task)
        {
            _context.Tasks.Update(task);
            _context.SaveChanges();
        }

        // Delete a task
        public void DeleteTask(int taskId)
        {
            var task = _context.Tasks.Find(taskId);
            if (task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();
            }
        }
    }
}