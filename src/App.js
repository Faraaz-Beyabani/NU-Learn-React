import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import db from "./components/index.js";

import 'rbx/index.css';
import {Card, Column, Image, Level, Content, Button, Divider, Navbar, Media, Title} from 'rbx';

import Sidebar from "react-sidebar";
import { initialValue } from 'rbx/components/modal/modal-context';

const ProductCard = ({ product, state }) => {
  var setCartOpen = state.setOpen;
  var cartContents = state.cart;
  var setCartContents = state.setCart;
  var inv = state.stock;


  return (
    <Card key={product.sku}>
      <Card.Image>
        <Image.Container>
          <Image src={require('../public/data/products/'+product.sku+'_1.jpg')}/>
        </Image.Container>
      </Card.Image>
      <Card.Content align="center">
        <Content style={{fontSize:"17px"}}>
          {product.title}
          <Divider style={{marginTop:"12px", marginBottom:"12px"}}/>
          ${parseFloat(product.price).toFixed(2)}
        </Content>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item>
          <Button.Group>
            {["S","M","L","XL"].filter((key) => {return inv[key]>0}).map(size => (
              <Button key={size} onClick={() => {setCartOpen(true);
                                      let productIndex = cartContents.findIndex((item) => {return item.product === product && item.size === size});
                                      productIndex !== -1
                                      ? cartContents[productIndex].count++
                                      : cartContents.push({product: product, size: size, count: 1}); 
                                      setCartContents(cartContents);}}>
                {size}
              </Button>
            ))}
          </Button.Group>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
};

const CartCard = ({ index, state }) => {

  var cart = state.cart;
  var setCart = state.setCart;

  return (
    <Card style={{width:"350px", height:"100px"}}>
      <Card.Header>
        <Button onClick={() => {let newCart = cart; newCart[index].count--; setCart(cart.filter((cartItem) => {return cartItem.count > 0})); }}>
          ❌
        </Button>
      </Card.Header>
      <Card.Content>
        <Media>
          <Media.Item as="figure" align="left" style={{position:"relative", bottom:"24px"}}>
            <Image.Container>
              <Image style={{height:"100px"}}
                src={require('../public/data/products/'+cart[index].product.sku+'_2.jpg')}
              />
            </Image.Container>
          </Media.Item>
          <Media.Item>
            <Title as="p" size={6}>
              {cart[index].product.title}
            </Title>
            <Title as="p" subtitle size={6}>
              {cart[index].count} x {cart[index].size} - ${parseFloat(cart[index].count*cart[index].product.price).toFixed(2)}
            </Title>
          </Media.Item>
        </Media>
      </Card.Content>
    </Card>
  );
};

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const [inv, setInv] = useState({});
  const inventory = Object.values(inv);
  useEffect(() => {
    const fetchInv = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInv(json);
    };
    fetchInv();
  }, [])

  const [cartOpen, setCartOpen] = useState(false);
  const [cartContents, setCartContents] = useState([]);

  var totalPrice = 0.0;
  cartContents.forEach((item) => {totalPrice += item.product.price * item.count})

  return (
    <React.Fragment>
      <Navbar fixed="top">
        <Navbar.Brand>
          <Navbar.Item>
            Shirt Store
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Segment align="end">
            <Navbar.Item>
              <Button>
                Login
              </Button>
            </Navbar.Item>
            <Navbar.Item>
              <Button onClick={() => setCartOpen(!cartOpen)}>
                🛒
              </Button>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>

      <Sidebar overlayClassName={"overlay"} open={cartOpen} onSetOpen={() => setCartOpen(false)} pullRight={true} styles={{ sidebar: { transition:"left .1s, right .1s", WebkitTransition: "-webkit-transform .1s ease-out", paddingTop:"53px", width:"300px", background: "white", position:"fixed" } }}
      sidebar={
        <React.Fragment>
          <Level>
            <Card style={{width:"350px", height:"100px"}}>
              <Card.Content>
                ${parseFloat(totalPrice).toFixed(2)}
              </Card.Content>
            </Card>
          </Level>
          {cartContents.map((cartItem, index) => (
            <Level>
              <CartCard key={index}
                        index={index}
                        state={{cart: cartContents, setCart: setCartContents}}/>
            </Level>
          ))}
        </React.Fragment>
        }/>

      <Column.Group style={{marginTop:"10px", marginLeft:"20px", marginRight:"20px"}}>
        {[1, 2, 3, 4].map(i => (
          <Column key={i}>          
            {products.slice(4*(i-1), 4*i).map(product => 
            <Level>
              <ProductCard state={{open: cartOpen, setOpen: setCartOpen, cart: cartContents, setCart: setCartContents, stock: inv[product.sku]}} product={product}/>
            </Level>)}
          </Column>
        ))}
      </Column.Group>
    </React.Fragment>
  );
};

export default App;