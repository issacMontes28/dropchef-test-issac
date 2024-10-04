import React, { useEffect, useState } from 'react';

function Checkout({data, setCheckoutFunc, order, setOrder, orderItems, setOrderItems, orderInProgress, setOrderInProgress}) {

    function submitOrder() {

    }

    function returnToMenu() {

    }

    return (
        <div>
            <h1>Checkout</h1>
            <div className="order-summary">
                <p className="made-fresh">Made Fresh</p>
                <div className="items-list">
                    {order && Object.keys(order.selection.madeFresh).map((item) => (
                    <div key={item} className="order-summary-item">
                        <img className="order-summary-item-img" src={order.selection.madeFresh[item].img} />
                        <p className="order-summary-item-description">{order.selection.madeFresh[item].name}</p>
                        <p className="order-summary-item-price-portions">{order.selection.madeFresh[item].quantitySelected}</p>
                        <div className="quantity-selector">
                            <button className="button-quantity">-</button>
                            <input className="quantity-input"/>
                            <button className="button-quantity">+</button>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="checkout-total">
                    <p className="total-text">Order Total</p>
                    <p className="price-per-week">{`Price per week: $${42}`}</p>
                    <p className="price-per-meal">{`Price per week: $${42}`}</p>
                    <p className="shipping">{`Price per week: $${42}`}</p>
                    <div className="divider">------------------</div>
                    <p className="gran-total">{`Price per week: $${82}`}</p>
                </div>
            </div>
        </div>
    );
}

export default Checkout;