import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './RewardsList.css'

const RewardsList = () => {
  const [userPoints, setUserPoints] = useState(0);

  const handleRedeem = async (points, itemName) => {
    const confirmation = window.confirm(`Do you want to spend ${points} points to redeem ${itemName}?`);
    if (confirmation) {
      try {
        const response = await fetch('http://localhost:3000/redeem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itemName: itemName,
            userId: 'userId_here' // Pass user ID here
          })
        });

        if (response.ok) {
          const data = await response.json();
          setUserPoints(data.userPoints);
          alert(`Item ${itemName} has been redeemed.`);
        } else {
          alert('Failed to redeem item. Please try again later.');
        }
      } catch (error) {
        console.error('Error redeeming item:', error);
        alert('Failed to redeem item. Please try again later.');
      }
    }
  };

  const rewardsData = [
    { name: "Singapore Poly T-shirt", points: 20, image: "/tshirt.jpg" },
    { name: "$5 Bookstore Voucher", points: 10 },
    { name: "Stationery Set", points: 15 },
    { name: "Movie Ticket", points: 25 },
    { name: "Cafeteria Meal Coupon", points: 30 },
    { name: "USB Drive (16GB)", points: 20 },
    { name: "Coffee Mug", points: 10 },
    { name: "Portable Power Bank", points: 30 },
    { name: "Bluetooth Speaker", points: 40 },
    { name: "Wireless Earphones", points: 50 }
  ];

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Rewards Redemption</h1>
      <div className="points text-center mb-4">You have {userPoints} points</div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {rewardsData.map((item, index) => (
          <Col key={index}>
            <Card className="item" onClick={() => handleRedeem(item.points, item.name)}>
              <Card.Img variant="top" src={item.image ? item.image : "/default.png"} />
              <div className="points-overlay">{item.points} points</div>
              <div className="redeem-overlay">Redeem this</div>
              <Card.Body>
                <Card.Title className="item-name">{item.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RewardsList;

