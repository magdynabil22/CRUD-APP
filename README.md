# User Management CRUD Application

A simple user management system application allows you to Create, Read, Update, and Delete user records with local storage persistence.

## 🚀 Features

- **Add New Users**: Create user profiles with username, phone number, email, and password
- **View Users**: Display all users in a clean, responsive table format
- **Edit Users**: Modify existing user information with pre-populated forms
- **Delete Users**: Remove users from the system with confirmation
- **Show Details**: View detailed user information in an expandable card format
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling via Bootstrap 5 CDN
- **Vanilla JavaScript**: Core functionality and DOM manipulation
- **Bootstrap 5**: Responsive UI components and styling

## 💡 How to Use

1. **View Users**: Open `table.html` to see all registered users
2. **Add User**: Click the "+ Add User" button to create a new user
3. **Edit User**: Click the "Edit" button next to any user to modify their information
4. **Delete User**: Click the "Delete" button to remove a user
5. **Show Details**: Click the "Show" button to view detailed user information


## 🔧 Core Functions

- `WriteIoStorage()`: Saves data to localStorage
- `ReadIoStorage()`: Retrieves data from localStorage with error handling
- `draw()`: Dynamically renders the users table
- `deleteUser()`: Removes users and updates the display
- `displayUser()`: Shows detailed user information
