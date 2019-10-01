import React, { useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import db from "./components/index.js";

import 'rbx/index.css';
import {Card, Column, Image, Level, Content, Button, Divider, Navbar, Media, Title} from 'rbx';

import Sidebar from "react-sidebar";

const ProductCard = ({ product, state }) => {
  var setCartOpen = Object.values(state)[1];
  var cartContents = Object.values(state)[2];
  var setCartContents = Object.values(state)[3];


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
            {["S","M","L","XL"].map(size => (
              <Button onClick={() => {setCartOpen(true); console.log(cartContents); 
                cartContents.push(product); console.log(cartContents); setCartContents(cartContents);}}>{size}</Button>
            ))}
          </Button.Group>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
};

const CartCard = ({ product }) => {
  return (
    <Card>
      <Card.Content>
        <Media>
          <Media.Item as="figure" align="left">
            <Image.Container as="p" size={50}>
              <Image
                src={require('../public/data/products/'+product.sku+'_2.jpg')}
              />
            </Image.Container>
          </Media.Item>
          <Media.Item>
            <Title as="p" size={4}>
              {product.title}
            </Title>
            <Title as="p" subtitle size={6}>
              ${parseFloat(product.price).toFixed(2)}
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

  const [cartOpen, setCartOpen] = useState(false);
  const [cartContents, setCartContents] = useState([]);

  return (
    <React.Fragment>
      <Navbar fixed="top">
        <Navbar.Brand>
          <Navbar.Item>
            Shopping Cart
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

      <Sidebar open={cartOpen} pullRight={true} styles={{ sidebar: { paddingTop:"53px", background: "white", position:"fixed" } }}
      sidebar={cartContents.map(cartItem => (
        <Level>
          <CartCard product={cartItem}/>
        </Level>
      ))}/>

      <Column.Group style={{marginTop:"10px", marginLeft:"20px", marginRight:"20px"}}>
        {[1, 2, 3, 4].map(i => (
          <Column key={i}>          
            {products.slice(4*(i-1), 4*i).map(product => 
            <Level>
              <ProductCard state={{cartOpen, setCartOpen, cartContents, setCartContents}} product={product}/>
            </Level>)}
          </Column>
        ))}
      </Column.Group>
    </React.Fragment>
  );
};

export default App;