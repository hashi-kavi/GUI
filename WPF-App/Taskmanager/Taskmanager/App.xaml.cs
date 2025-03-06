using System.Windows;

namespace Taskmanager
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            Landing mainWindow = new Landing();
            mainWindow.Show();
        }
    }
}
