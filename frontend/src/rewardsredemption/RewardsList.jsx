"use client";
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './RewardsList.css'
import { getUsername } from "../services/userDetails.ts";

const RewardsList = () => {
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    async function fetchUserPoints() {
      try {
        const response = await fetch('http://localhost:3000/userPoints', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserPoints(data.userPoints);
        } else {
          console.error('Failed to fetch user points');
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    }

    fetchUserPoints();
  }, []); 

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
            userId: 'userId_here'
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
    { name: "$5 Bookstore Voucher", points: 10, image: "/voucher.jpg" },
    { name: "Singapore Poly T-shirt", points: 15, image: "/tshirt.jpg" },
    { name: "Art Marker Set (60 Pcs)", points: 20, image: "/marker.jpg"  },
    { name: "USB Drive (16GB)", points: 30, image: "/usb.jpg"  },
    { name: "Power Bank (10000 mAh)", points: 40, image: "/powerbank.jpg" },
    { name: "Bluetooth Speaker", points: 50, image: "/speaker.jpg" },
    { name: "Wireless Earphones", points: 70, image: "/earphones.jpg" }
  ];

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Rewards Redemption</h1>
      <div className="points text-center mb-4">You have {userPoints} points</div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {rewardsData.map((item, index) => (
          <Col key={index}>
            <Card className="item" onClick={() => handleRedeem(item.points, item.name)}>
              <Card.Img variant="top" src={item.image ? item.image : "/default.jpg"} />
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
