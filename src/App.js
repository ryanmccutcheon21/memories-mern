import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories.png'
import useStyles from './styles'

function App() {
  // getting state to share with Form and Post components for update functionality
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()

  // redux hook
  const dispatch = useDispatch()
  // dispatching getPosts
  useEffect(() => {
    dispatch(getPosts())
    // using currentId means every time the id changes the getPosts() will be dispatched
  }, [currentId, dispatch])

  return (
    <Container maxWidth='lg'>
      <AppBar position='static' color='inherit' className={classes.appBar}>
        <Typography variant='h2' align='center' className={classes.heading}>Memories</Typography>
        <img src={memories} alt='memories' height='60' className={classes.image} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
