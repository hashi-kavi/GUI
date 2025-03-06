using System;
using System.Windows;

namespace Taskmanager
{
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                // Ensure UI elements are initialized
                if (UsernameTextBox == null || PasswordBox == null)
                {
                    MessageBox.Show("UI elements are not properly initialized.");
                    return;
                }

                string username = UsernameTextBox.Text;
                string password = PasswordBox.Password;

                // Validate credentials
                if (ValidateCredentials(username, password))
                {
                    MessageBox.Show("Login Successful!");
                    MainWindow mainWindow = new();
                    mainWindow.Show();
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Invalid username or password.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"An error occurred: {ex.Message}");
            }
        }

        private static bool ValidateCredentials(string username, string password)
        {
            // Replace this with actual validation logic (e.g., database lookup).
            return username == "admin" && password == "password";
        }
    }
}