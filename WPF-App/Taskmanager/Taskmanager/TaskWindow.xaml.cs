using System.Windows;

namespace Taskmanager
{
    public partial class TaskWindow : Window
    {
        // Property to hold the task being created or edited
        public Mytasks Task { get; private set; }

        // Constructor to initialize the window with an existing task or a new task
        public TaskWindow(Mytasks? task = null)
        {
            InitializeComponent();

            // If no task is provided, create a new one
            Task = task ?? new Mytasks();

            // Set the DataContext to the task for data binding
            DataContext = Task;
        }

        // Event handler for the Save button
        private void Save_Click(object sender, RoutedEventArgs e)
        {
            // Validate input before saving
            if (string.IsNullOrWhiteSpace(Task.Title))
            {
                MessageBox.Show("Title cannot be empty.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            // Set DialogResult to true to indicate successful save
            DialogResult = true;

            // Close the window
            Close();
        }

        // Event handler for the Cancel button
        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            // Set DialogResult to false to indicate cancellation
            DialogResult = false;

            // Close the window
            Close();
        }
    }
}