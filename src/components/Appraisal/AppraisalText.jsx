import Animated from "../Animated";
import { Form, Button, Spinner } from "react-bootstrap";
import { Clipboard } from "react-bootstrap-icons";

function AppraisalText(props) {


    return(

        <Animated>
            <Form>
            <Form.Group controlId="appraisalText">
            <Form.Label>Appraisal:</Form.Label>
            <Form.Control
              key="appraisal"
              as="textarea"
              name="appraisal"
              placeholder="Enter list of items to be appraised."
            />
          </Form.Group>

          <Form.Group controlId="appraisalComment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              key="app-comment"
              as="textarea"
              name="comment"
              value={props.comment}
              onChange={(e) => {
                props.setComment(e.target.value);
              }}
              placeholder="Enter your comment."
            />
          </Form.Group>
          <p></p>
          <Button variant="secondary" onClick={props.calculateAppraisal}>
            {props.isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button
            disabled={!props.uuid}
            onClick={props.handleCopy}
            variant="outline"
          >
            <Clipboard className="mr-2 h-4 w-4" />
            Copy URL
          </Button>

            </Form>

        </Animated>
    );
}
export default AppraisalText;