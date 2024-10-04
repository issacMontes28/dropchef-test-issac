import Menu from "./Menu";
import {useEffect, useState} from "react";
import Checkout from "./Checkout";

function App() {
  //fetched data
  const [data, setData] = useState([]);
  const [checkout, setCheckout] = useState(false);
  //IDs of selected items in the current order
  const [orderItems, setOrderItems] = useState([]);
  //set the object that will act as payload for submitting the new order
  const [order, setOrder] = useState(null);
  //flag for indicating if order is in progress
  const [orderInProgress, setOrderInProgress] = useState(false);

  function setCheckoutFunc(val) {
      setCheckout(val)
  }

  useEffect(() => {
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyeWFuK2Rldi10ZXN0QGRyb3BjaGVmLmNvbSIsInVzZXJJZCI6MjExNTIsIndwVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKcGMzTWlPaUpvZEhSd09pOHZjSEp2WkMxa2NtOXdZMmhsWmk1MFpYTjBJaXdpYVdGMElqb3hOekkyTVRVd016TTBMQ0p1WW1ZaU9qRTNNall4TlRBek16UXNJbVY0Y0NJNk1UYzFOelk0TmpNek5Dd2laR0YwWVNJNmV5SjFjMlZ5SWpwN0ltbGtJam9pTWpFeE5USWlmWDE5LjNvb3VkNVVFck4xcmhxMnNFMGhBdjBRczBDU3Rtb0l1bF9Ubl82eGF2RzAiLCJpYXQiOjE3MjYxNTAzMzQsImV4cCI6MTc1NzY4NjMzNH0.jR53uxjJ13ef06WRPwreLNpVQdLeN0OWBjgy1jdKTVA' }; // auth header with bearer token
    fetch('http://192.168.7.110:3000/v1/menus/586555', { headers })
        .then(response => response.json())
        .then(data => {
          setData(data.marketItems);
        })
        .catch((error) => console.error('Error fetching data:', error));
    //console.log('Updated order:', order);
  }, []);

  if (!checkout) {
    return <Menu data={data}
                 setCheckoutFunc={setCheckoutFunc}
                 order={order}
                 setOrder={setOrder}
                orderItems={orderItems}
                setOrderItems={setOrderItems}
                orderInProgress={orderInProgress}
                setOrderInProgress={setOrderInProgress}
    />
  } else {
      return <Checkout data={data}
                       setCheckoutFunc={setCheckoutFunc}
                       order={order}
                       setOrder={setOrder}
                       orderItems={orderItems}
                       setOrderItems={setOrderInProgress}
                       orderInProgress={orderInProgress}
                       setOrderInProgress={setOrderInProgress}
      />
  }
}

export default App;