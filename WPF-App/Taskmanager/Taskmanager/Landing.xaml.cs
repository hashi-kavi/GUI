using System.Windows;

namespace Taskmanager
{
    public partial class Landing : Window
    {
        public Landing()
        {
            InitializeComponent();
        }

        private void HandleGetStartedClick(object sender, RoutedEventArgs e)
        {
            // Navigate to the LoginWindow
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show(); // Open the LoginWindow
            this.Close();        // Close the Landing page
        }
    }
}