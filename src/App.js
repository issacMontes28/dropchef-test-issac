import React, { useEffect, useState } from 'react';

function App() {
  // Step 1: Set up state to store fetched data
  const [data, setData] = useState([]);

  // Step 2: Fetch data when the component mounts
  useEffect(() => {
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyeWFuK2Rldi10ZXN0QGRyb3BjaGVmLmNvbSIsInVzZXJJZCI6MjExNTIsIndwVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcGMzTWlPaUpvZEhSd09pOHZjSEp2WkMxa2NtOXdZMmhsWmk1MFpYTjBJaXdpYVdGMElqb3hOekkyTVRVd016TTBMQ0p1WW1ZaU9qRTNNall4TlRBek16UXNJbVY0Y0NJNk1UYzFOelk0TmpNek5Dd2laR0YwWVNJNmV5SjFjMlZ5SWpwN0ltbGtJam9pTWpFeE5USWlmWDE5LjNvb3VkNVVFck4xcmhxMnNFMGhBdjBRczBDU3Rtb0l1bF9Ubl82eGF2RzAiLCJpYXQiOjE3MjYxNTAzMzQsImV4cCI6MTc1NzY4NjMzNH0.jR53uxjJ13ef06WRPwreLNpVQdLeN0OWBjgy1jdKTVA' }; // auth header with bearer token
    fetch('http://192.168.7.110:3000/v1/menus/586555', { headers })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data.marketItems);
        })
        .catch((error) => console.error('Error fetching data:', error));
  }, []);  // Empty array means it runs once after the initial render

  return (
      <div>
        <h1>Posts</h1>

        <ul>
          {/* Alternative: React prefers .map() for rendering elements */}
          {data.map((item) => (
              <li key={item.id}>{item.data.description}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;