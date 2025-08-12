import { Container, Paper, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function About() {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            About
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
            This page uses BasicLayout with header and footer. The entire application is built with modern web technologies including React, Vite, and Material UI for a consistent and beautiful user experience.
          </Typography>
          
          <Card sx={{ mt: 4, background: 'primary.50' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', mb: 3 }}>
                Features
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Responsive design with Material UI" 
                    secondary="Built with Material Design principles"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Modern React with hooks and functional components" 
                    secondary="Using the latest React features"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fast development with Vite" 
                    secondary="Lightning-fast build tool"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Clean and maintainable code structure" 
                    secondary="Well-organized component architecture"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    )
}

export default About
