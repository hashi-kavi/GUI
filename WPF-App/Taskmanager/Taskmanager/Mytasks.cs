namespace Taskmanager
{
    public class Mytasks
    {
        public int Id { get; set; } // Add an Id property for the primary key
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }

        // Constructor to initialize non-nullable properties
        public Mytasks()
        {
            Title = string.Empty; // Initialize to an empty string
            Description = string.Empty; // Initialize to an empty string
        }
    }
}