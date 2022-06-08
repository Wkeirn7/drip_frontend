import React from 'react'
import { Form, Button } from 'react-bootstrap';

const GraphForm = (props) => {

    const handleSubmission = (e) => {
        e.preventDefault()
        let graphdata ={
        'graph_name': e.target.elements[0].value,
        'reinvestment_period': e.target.elements[1].value,
        'reinvestment_amount': e.target.elements[2].value
        }
        return props.submission(graphdata)
    }

    return (
        <div>
            <Form onSubmit={handleSubmission}>
                <Form.Group className="mb-3" controlId="formGraphName">
                    <Form.Label>New Graph</Form.Label>
                    <Form.Control placeholder="Enter Graph Name" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formReinvestPeriod">
                    <Form.Label>Reinvestment Period</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="Annually">Annually</option>
                        {/* <option value="Monthly">Monthly</option>  Not yet able to implement*/}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formReinvestAmount">
                    <Form.Label>Reinvestment Amount</Form.Label>
                    <Form.Control placeholder="Enter Reinvestment Amount" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
};

export default GraphForm;
