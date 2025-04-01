// Initialize variables
let userProfile = null;

// Handle Google Sign-In Response
function handleCredentialResponse(response) {
  const data = JSON.parse(atob(response.credential.split('.')[1])); // Decode JWT token
  userProfile = {
    name: data.name,
    email: data.email,
    picture: data.picture,
    username: `@${data.email.split('@')[0]}`
  };

  // Update UI
  document.getElementById('user-profile-pic').src = userProfile.picture;
  document.getElementById('user-name').textContent = userProfile.name;

  // Hide sign-in page and show homepage
  document.getElementById('signin-page').classList.add('hidden');
  document.getElementById('homepage').classList.remove('hidden');

  // Simulate fetching chat history
  fetchChatHistory();
}

// Fetch Chat History (Simulated)
function fetchChatHistory() {
  const chatList = document.getElementById('chat-list');
  chatList.innerHTML = ''; // Clear previous chats

  // Simulated chat history
  const chats = [
    { name: 'Alice', lastMessage: 'Hey, how are you?' },
    { name: 'Bob', lastMessage: 'See you later!' }
  ];

  chats.forEach(chat => {
    const li = document.createElement('li');
    li.textContent = `${chat.name}: ${chat.lastMessage}`;
    chatList.appendChild(li);
  });
}

// Open Profile Modal
document.getElementById('profile-icon').addEventListener('click', () => {
  if (!userProfile) return;

  document.getElementById('modal-profile-pic').src = userProfile.picture;
  document.getElementById('modal-user-name').textContent = userProfile.name;
  document.getElementById('modal-user-email').textContent = userProfile.email;

  document.getElementById('profile-modal').classList.remove('hidden');
});

// Close Profile Modal
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('profile-modal').classList.add('hidden');
});

// Initialize Google Sign-In
window.onload = () => {
  google.accounts.id.initialize({
    client_id: '917239533191-8j60nfkadvv6osiabkvdqufqr7vcml61.apps.googleusercontent.com',
    callback: handleCredentialResponse
  });

  // Attach click event to custom sign-in button
  document.getElementById('custom-signin-button').addEventListener('click', () => {
    google.accounts.id.prompt(); // Trigger Google Sign-In dialog
  });
};
