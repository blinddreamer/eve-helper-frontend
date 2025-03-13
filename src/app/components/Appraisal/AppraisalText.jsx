import Animated from "../Animated";
import { Form, Button, Spinner } from "react-bootstrap";

function AppraisalText(props) {
  return (
    
      <Form>
        <div id="appraisalformmid">
          <div id="appraisaltextleft">
            <Form.Group controlId="appraisalText">
              <Form.Label>Appraisal:</Form.Label>
              <Form.Control
                key="appraisal"
                as="textarea"
                name="appraisal"
                placeholder="Enter list of items to be appraised."
              />
            </Form.Group>
          </div>
          <div id="appraisalcommentright">
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
          </div>
        </div>
        <div id="appraisalbuttoncontainer">
          <div id="buttonappraisalleft">
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
          </div>
        </div>
      </Form>
   
  );
}
export default AppraisalText;
