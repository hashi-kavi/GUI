using System;
using System.Linq;
using System.Windows;

namespace Taskmanager
{
    public partial class MainWindow : Window
    {
        private readonly TaskService _taskService;

        public MainWindow()
        {
            InitializeComponent();
            _taskService = new TaskService(); // Initialize the TaskService
            LoadTasks(); // Load tasks when the window is initialized
        }

        // Load tasks from the database and bind them to the DataGrid
        private void LoadTasks()
        {
            TaskGrid.ItemsSource = _taskService.GetAllTasks();
        }

        // Event handler for the "Add Task" button
        private void Add_Task(object sender, RoutedEventArgs e)
        {
            var addTaskWindow = new TaskWindow();
            if (addTaskWindow.ShowDialog() == true)
            {
                _taskService.AddTask(addTaskWindow.Task);
                LoadTasks(); // Refresh the task list
            }
        }

        // Event handler for the "Update Task" button
        private void Update_Task(object sender, RoutedEventArgs e)
        {
            if (TaskGrid.SelectedItem is Mytasks selectedTask)
            {
                var updateTaskWindow = new TaskWindow(selectedTask);
                if (updateTaskWindow.ShowDialog() == true)
                {
                    _taskService.UpdateTask(updateTaskWindow.Task);
                    LoadTasks(); // Refresh the task list
                }
            }
            else
            {
                MessageBox.Show("Please select a task to update.");
            }
        }

        // Event handler for the "Delete Task" button
        private void Delete_Task(object sender, RoutedEventArgs e)
        {
            if (TaskGrid.SelectedItem is Mytasks selectedTask)
            {
                _taskService.DeleteTask(selectedTask.Id);
                LoadTasks(); // Refresh the task list
            }
            else
            {
                MessageBox.Show("Please select a task to delete.");
            }
        }

        // Event handler for the "Mark as Complete" button
        private void Mark_Complete(object sender, RoutedEventArgs e)
        {
            if (TaskGrid.SelectedItem is Mytasks selectedTask)
            {
                selectedTask.IsCompleted = true;
                _taskService.UpdateTask(selectedTask);
                LoadTasks(); // Refresh the task list
            }
            else
            {
                MessageBox.Show("Please select a task to mark as complete.");
            }
        }

        private void TaskGrid_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {

        }
    }
}
