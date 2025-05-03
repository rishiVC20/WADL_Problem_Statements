async function loadUsers() {
    const res = await fetch('/api/users');
    const users = await res.json();
  
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
  
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.id} ${user.name} (${user.email})`;
      userList.appendChild(li);
    });
  }
  
  window.onload = loadUsers;
  