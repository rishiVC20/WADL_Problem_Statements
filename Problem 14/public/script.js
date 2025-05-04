document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(users => {
        const list = document.getElementById('userList');
        users.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${user.name}</strong> - ${user.email}`;
          list.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  });