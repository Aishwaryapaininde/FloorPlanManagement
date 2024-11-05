import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function Home() {
  return (
    <div className="home-background">
      <div className="content">
        <Typography variant="h4" align="center" gutterBottom sx={{color:"black", fontWeight:'bold', fontSize:'3rem', marginTop:'40%'}}>
          Floor Plan Management System 
        </Typography>
        
        <div className="cards-container" style={{marginTop:'110px', marginBottom:'40px'}}>
          <Card className="card" component={Link} to="/add-plan" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' , textDecoration:'none' }}>
            <CardMedia
              height="140"
              alt="Add Floor Plan"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Add Floor Map
              </Typography>
            </CardContent>
          </Card>
          
          <Card className="card" component={Link} to="/modify-plan" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' , textDecoration:'none' }}>
            <CardMedia
              
              height="140"
              
              alt="View Floor Plan"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Modify Floor Map
              </Typography>
            </CardContent>
          </Card>

          <Card className="card" component={Link} to="/delete-plan" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' , textDecoration:'none'}}>
            <CardMedia
              
              height="140"
              alt="Delete Floor Plan"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                Delete Floor Map
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

