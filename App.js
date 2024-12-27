import React from 'react';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import ProductivityTracker from './components/ProductivityTracker';
import CalendarIntegration from './components/CalendarIntegration';

function App() {
    return (
        <div>
            <Header />
            <TaskManager />
            <ProductivityTracker />
            <CalendarIntegration />
        </div>
    );
}

export default App;
