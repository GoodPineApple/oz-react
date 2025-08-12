import { Container, Paper, Typography, Card, CardContent, Grid, Box, Divider, Chip } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { useLocation } from 'react-router';

import { useState } from 'react';

const ChildComponent = ({ onClick }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>Click Me</button>;
};

function ParentComponent() {
  const [count, setCount] = useState(0);
  const handleClick = () => console.log('Button clicked');
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}


function Location() {
    const location = useLocation()
    
    const locationData = [
      {
        title: 'Current Pathname',
        value: location.pathname,
        icon: <LocationIcon color="primary" />,
        color: 'primary'
      },
      {
        title: 'Search Parameters',
        value: location.search || 'None',
        icon: <CodeIcon color="secondary" />,
        color: 'secondary'
      },
      {
        title: 'Hash',
        value: location.hash || 'None',
        icon: <SettingsIcon color="info" />,
        color: 'info'
      },
      {
        title: 'State',
        value: JSON.stringify(location.state) || 'None',
        icon: <InfoIcon color="warning" />,
        color: 'warning'
      }
    ]
  
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ParentComponent />
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            Location Info
          </Typography>
          
          <Grid container spacing={3}>
            {locationData.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {item.icon}
                      <Typography variant="h6" component="h3" sx={{ ml: 1, fontWeight: 'semibold' }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Chip
                      label={item.value}
                      variant="outlined"
                      color={item.color}
                      sx={{ 
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        maxWidth: '100%',
                        wordBreak: 'break-all'
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    )
  }
  
  export default Location;