# PicTale — Frontend

PicTale is a story-sharing web application where users can share images along with the stories behind them.

This repository contains the **frontend** of PicTale, built with React and Tailwind CSS.

## Features

* User registration and login
* Authentication with access tokens and refresh tokens
* Protected user actions
* View posts from other users
* Create posts with:

  * Title
  * Story/content
  * Image URL
  * Custom image positioning for card previews
* Edit posts
* Delete posts
* Read full stories
* Author information on posts
* Paginated post feed
* Responsive UI
* Loading and error handling
* Axios API integration

## Tech Stack

* React
* React Router
* Tailwind CSS
* Axios
* JavaScript
* Vite

## Project Structure

```text
src/
├── api/
│   └── axios.js
│
├── components/
│   └── Header.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CreatePost.jsx
│   └── Post.jsx
│
├── App.jsx
└── main.jsx
```

## Authentication

PicTale uses an authentication context to manage the user's authentication state across the application.

The frontend stores the access token and sends it with API requests using an Axios interceptor.

```text
Authorization: Bearer <accessToken>
```

The application also uses the backend refresh-token system to maintain authentication when the access token expires.

## API Configuration

The Axios instance is configured in:

```text
src/api/axios.js
```

The default backend URL is:

```text
http://localhost:5000/api
```

If your backend runs on a different URL, update the `baseURL` in `axios.js`.

## Running the Project

Clone the repository and enter the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Post Pagination

Posts are loaded from the backend using pagination.

The frontend requests:

```text
GET /post?page=1&limit=9
```

The backend returns the posts for that page along with pagination information such as:

* Current page
* Total pages
* Total posts

The frontend uses this information to provide page navigation.

## Image Positioning

PicTale does not upload or modify image files.

Users provide an image URL and can choose which portion of the image should appear inside the post card.

The selected position is stored as percentage coordinates and used with CSS `object-position`.

Example:

```jsx
style={{
    objectPosition: `${post.crop?.x ?? 50}% ${post.crop?.y ?? 50}%`
}}
```

This allows the same image to be displayed with a custom crop position without actually modifying the original image.

## Backend

The PicTale frontend communicates with the PicTale backend API.

Backend responsibilities include:

* Authentication
* User management
* Post creation
* Post retrieval
* Post updating
* Post deletion
* Pagination
* Authorization

## Future Improvements

* Comments
* Likes
* User profiles
* Search
* Categories/tags
* Infinite scrolling
* Image upload support
* Improved image positioning controls
* Notifications

## Author

Ayush Upadhyay
