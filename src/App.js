import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyeWFuK2Rldi10ZXN0QGRyb3BjaGVmLmNvbSIsInVzZXJJZCI6MjExNTIsIndwVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcGMzTWlPaUpvZEhSd09pOHZjSEp2WkMxa2NtOXdZMmhsWmk1MFpYTjBJaXdpYVdGMElqb3hOekkyTVRVd016TTBMQ0p1WW1ZaU9qRTNNall4TlRBek16UXNJbVY0Y0NJNk1UYzFOelk0TmpNek5Dd2laR0YwWVNJNmV5SjFjMlZ5SWpwN0ltbGtJam9pTWpFeE5USWlmWDE5LjNvb3VkNVVFck4xcmhxMnNFMGhBdjBRczBDU3Rtb0l1bF9Ubl82eGF2RzAiLCJpYXQiOjE3MjYxNTAzMzQsImV4cCI6MTc1NzY4NjMzNH0.jR53uxjJ13ef06WRPwreLNpVQdLeN0OWBjgy1jdKTVA' }; // auth header with bearer token
    fetch('http://192.168.7.110:3000/v1/menus/586555', { headers })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data.marketItems);
        })
        .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
      <div>
        <h1>Menu</h1>
          <div className="menu-container">
              {data.map((item) => (
                  <>
                      <div key={item.id} className="menu-item-card">
                          <img src={item.data.imageURL} alt={item.data.name} className="menu-item-image" />
                          <div className="menu-item-details">
                              <h3 className="menu-item-name">{item.name}</h3>
                              <p className="menu-item-description">{item.data.description}</p>
                          </div>
                          <div className="item-footer">
                              <p className="menu-item-price">${item.data.price.toFixed(2)}</p>
                              <div className="button-add-to-order">
                                  <button className="add-to-order-btn">ADD TO ORDER</button>
                              </div>
                              <div className="quantity-selector">
                                  <button className="button-quantity">-</button>
                                  <input className="quantity-input" value="1"/>
                                  <button className="button-quantity">+</button>
                              </div>
                          </div>
                      </div>
                  </>
              ))}
          </div>
      </div>
  );
}

export default App;