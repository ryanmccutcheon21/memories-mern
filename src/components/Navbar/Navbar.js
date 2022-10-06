import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { LOGOUT } from '../../constants/actionTypes'

const Navbar = () => {
    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: LOGOUT })

        history.push('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token)
            // logout user if token expired
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar position='static' color='inherit' className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' variant='h2' align='center' className={classes.heading}>Memories</Typography>
                <img src={memories} alt='memories' height='60' className={classes.image} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar