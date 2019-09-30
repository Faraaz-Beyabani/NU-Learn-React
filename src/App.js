import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import db from "./components/index.js";

import 'rbx/index.css';
import {Card, Column, Image, Level, Content, Button, Divider, Navbar} from 'rbx';

const ProductCard = ({ product }) => {
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
              <Button>{size}</Button>
            ))}
          </Button.Group>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  )
}

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
              <Button>
              🛒
              </Button>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>
      <Column.Group style={{marginTop:"10px", marginLeft:"20px", marginRight:"20px"}}>
        {[1, 2, 3, 4].map(i => (
          <Column key={i}>          
            {products.slice(4*(i-1), 4*i).map(product => 
            <Level style={{display:"flex"}}>
              <ProductCard product={product}/>
            </Level>)}
          </Column>
        ))}
      </Column.Group>
    </React.Fragment>
  );
};

export default App;