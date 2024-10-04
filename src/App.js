import React, { useEffect, useState } from 'react';

function App() {
  //fetched data
  const [data, setData] = useState([]);
  //IDs of selected items in the current order
  const [orderItems, setOrderItems] = useState([]);
  //set the object that will act as payload for submitting the new order
  const [order, setOrder] = useState(null);
  //flag for indicating if order is in progress
  const [orderInProgress, setOrderInProgress] = useState(false);

  useEffect(() => {
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyeWFuK2Rldi10ZXN0QGRyb3BjaGVmLmNvbSIsInVzZXJJZCI6MjExNTIsIndwVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcGMzTWlPaUpvZEhSd09pOHZjSEp2WkMxa2NtOXdZMmhsWmk1MFpYTjBJaXdpYVdGMElqb3hOekkyTVRVd016TTBMQ0p1WW1ZaU9qRTNNall4TlRBek16UXNJbVY0Y0NJNk1UYzFOelk0TmpNek5Dd2laR0YwWVNJNmV5SjFjMlZ5SWpwN0ltbGtJam9pTWpFeE5USWlmWDE5LjNvb3VkNVVFck4xcmhxMnNFMGhBdjBRczBDU3Rtb0l1bF9Ubl82eGF2RzAiLCJpYXQiOjE3MjYxNTAzMzQsImV4cCI6MTc1NzY4NjMzNH0.jR53uxjJ13ef06WRPwreLNpVQdLeN0OWBjgy1jdKTVA' }; // auth header with bearer token
    fetch('http://192.168.7.110:3000/v1/menus/586555', { headers })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setData(data.marketItems);
        })
        .catch((error) => console.error('Error fetching data:', error));
      //console.log('Updated order:', order);
  }, [order]);

    //user clicks on "ADD TO ORDER"
    //the quantity selector opens up (use orderItems for tracking all the items in the current order)
    // (it clicks on ADD to order, add to array orderItems)

    //2
    //user selects quantity
    //the user can select any meal and any quantity
    //if the user puts 0 on quantity, it does not count for the order
    // (check in the orderItems the existence of the item, if it does exist, increment by one, if it decreased, descrease quantity, if quantity = 0)
    //remove item from array

    //if the user puts 1 or more, it counts for the order
    //use orderItems variable to track current order items every time user clicks on + or - button
    //
  function addOrderItem(itemId){
      if (!orderInProgress) {
          setOrderInProgress(true)
      }

      if (!orderItems.includes(itemId)) {
          setOrderItems([...orderItems, itemId]);
      }

      //where to store the initial quantity?
      setOrderItemQuantity(itemId,false)
  }

  //3
  //the bottom selector checks how many items selected
  //if 1 or more items selected, enables green button for proceed to checkout order
  function setOrderItemQuantity(itemId, subtract){
      const itemIdStr = String(itemId)

      const auxOrder = order || {
          "selection": {
              "recipeKits": {},
              "madeFresh": {},
              "marketItems": {}
          }
      }

      //if it has the property, simply adjust the quantity
      if (auxOrder.selection.madeFresh.hasOwnProperty(itemIdStr)) {
          const auxQuantity = auxOrder.selection.madeFresh[itemIdStr].quantitySelected
          auxOrder.selection.madeFresh[itemIdStr].quantitySelected = auxQuantity + (subtract ? -1 : 1)
      } else {
          auxOrder.selection.madeFresh[itemIdStr] = {
              "id": itemId,
              "quantitySelected": 1
          }

      }

      setOrder(auxOrder)
  }

  function getMealsSelected() {
      return order ? Object.keys(order.selection.madeFresh).length : 0
  }

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
                              {!orderItems.includes(item.id) &&
                                  <div className="button-add-to-order">
                                      <button className="add-to-order-btn" onClick={() => addOrderItem(item.id)}>ADD TO ORDER</button>
                                  </div>
                              }
                              {orderItems.includes(item.id) &&
                                <div className="quantity-selector">
                                  <button className="button-quantity" onClick={() => setOrderItemQuantity(item.id, true)}>-</button>
                                  <input className="quantity-input" value="1"/>
                                  <button className="button-quantity" onClick={() => setOrderItemQuantity(item.id)}>+</button>
                                </div>
                              }
                          </div>
                      </div>
                  </>
              ))}
          </div>
          <div className="order-details">
              <div className="order-summary">{ `${getMealsSelected()} Made Fresh Selected`}</div>
              <button className="proceed-checkout">GO TO CHECKOUT</button>
          </div>
      </div>
  );
}

export default App;