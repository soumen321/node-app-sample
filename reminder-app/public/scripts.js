document.addEventListener('DOMContentLoaded', function() {
    const reminderForm = document.getElementById('reminderForm');
    const reminderList = document.getElementById('reminderList');

    // Load reminders from server
    fetch('/reminders')
        .then(response => response.json())
        .then(reminders => {
            reminders.forEach(reminder => {
                const li = document.createElement('li');
                li.textContent = `${reminder.title} - ${reminder.description} - ${new Date(reminder.date).toLocaleString()}`;
                reminderList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching reminders:', error));

    // Handle form submission
    reminderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(reminderForm);
        const reminderData = {
            title: formData.get('title'),
            description: formData.get('description'),
            date: formData.get('date')
        };

        fetch('/reminders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reminderData)
        })
        .then(response => response.json())
        .then(newReminder => {
            const li = document.createElement('li');
            li.textContent = `${newReminder.title} - ${newReminder.description} - ${new Date(newReminder.date).toLocaleString()}`;
            reminderList.appendChild(li);
            reminderForm.reset();
        })
        .catch(error => console.error('Error adding reminder:', error));
    });
});
