import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';


const UserForm = (props) => {

    let [displayLoading, setDisplayLoading] = useState(false);

    const handleSubmission = async (e) => {
        e.preventDefault();
        setDisplayLoading(true);

        let userObj = {
            username: e.target.elements[0].value,
            password: e.target.elements[1].value,
        }
        let resp = await props.submission(userObj)
        if(!resp){
            setDisplayLoading(false);
        }
    }

    return (
        <Form onSubmit={handleSubmission}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {
                !displayLoading 
                ?
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                :
                    <Button variant="primary" disabled>
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                    Loading...
                    </Button>
            }
        </Form>
    )
}

export default UserForm;
