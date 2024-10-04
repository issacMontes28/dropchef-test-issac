function Menu({data, setCheckoutFunc, order, setOrder, orderItems, setOrderItems, orderInProgress, setOrderInProgress}) {
    //user clicks on "ADD TO ORDER"
    //the quantity selector opens up (use orderItems for tracking all the items in the current order)
    // (it clicks on ADD to order, add to array orderItems)

    function addOrderItem(item){
        if (!orderInProgress) {
            setOrderInProgress(true)
        }

        if (!orderItems.includes(item.data.id)) {
            setOrderItems([...orderItems, item.data.id]);
        }

        //where to store the initial quantity?
        setOrderItemQuantity(item,false)
    }

    //the bottom selector checks how many items selected
    //if 1 or more items selected, enables green button for proceed to checkout order
    function setOrderItemQuantity(item, subtract){
        console.log(item)
        const itemIdStr = String(item.data.id)

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
                "id": item.data.id,
                "name": item.data.name,
                "quantitySelected": 1,
                "img": item.data.imageURL,
                "price": item.data.price,
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
                                    <button className="add-to-order-btn" onClick={() => addOrderItem(item)}>ADD TO ORDER</button>
                                </div>
                                }
                                {orderItems.includes(item.id) &&
                                <div className="quantity-selector">
                                    <button className="button-quantity" onClick={() => setOrderItemQuantity(item, true)}>-</button>
                                    <input className="quantity-input" value="1"/>
                                    <button className="button-quantity" onClick={() => setOrderItemQuantity(item)}>+</button>
                                </div>
                                }
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <div className="order-details">
                <div className="order-summary">{ `${getMealsSelected()} Made Fresh Selected`}</div>
                <button className="proceed-checkout" onClick={() => setCheckoutFunc(true) }>GO TO CHECKOUT</button>
            </div>
        </div>
    );
}

export default Menu;