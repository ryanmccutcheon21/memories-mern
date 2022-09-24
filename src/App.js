import React, { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import memories from './images/memories.png'
import useStyles from './styles'

function App() {
  const classes = useStyles()

  // redux hook
  const dispatch = useDispatch()
  // dispatching getPosts
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <Container maxWidth='lg'>
      <AppBar position='static' color='inherit' className={classes.appBar}>
        <Typography variant='h2' align='center' className={classes.heading}>Memories</Typography>
        <img src={memories} alt='memories' height='60' className={classes.image} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
