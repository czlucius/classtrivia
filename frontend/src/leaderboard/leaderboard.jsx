"use client";
import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('http://localhost:3000/leaderboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data.leaderboard);
        } else {
          console.error('Failed to fetch leaderboard');
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    }

    fetchLeaderboard();
  }, []); 

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Leaderboard</h1>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaderboardPage;
