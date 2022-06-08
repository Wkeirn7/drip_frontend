import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


const NavMenu = (props) => {
    const user  = useContext(UserContext);
    const navigate = useNavigate()
    

    const handleClick = () => {
        props.changeUserStatus('logout');
        navigate('/login')
    }

    const handleLoginClick = () => {
        navigate('/login')
    }

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="">DRIP investing</Navbar.Brand>
                    <Nav className="me-auto">
                    { user.isLoggedIn && <Nav.Link as={Link} to="/">Home</Nav.Link>}
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/how-to">How To</Nav.Link>

                    </Nav>
                    { 
                    user.isLoggedIn 
                    ? <Button onClick={handleClick}>Log out</Button> 
                    : <Button onClick={handleLoginClick}>Log in</Button>
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default NavMenu;
