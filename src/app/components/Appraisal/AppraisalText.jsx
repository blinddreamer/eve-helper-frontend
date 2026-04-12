import { Form, Button, Spinner } from "react-bootstrap";

function AppraisalText(props) {
  return (
    <div className="appr-input-area">
      <div className="appr-textareas">
        <Form.Group className="appr-textarea-group calc-form-group" controlId="appraisalText">
          <Form.Label>Items</Form.Label>
          <Form.Control
            as="textarea"
            className="appr-textarea"
            value={props.appraisalData}
            onChange={(e) => props.setAppraisalData(e.target.value)}
            placeholder={"Item Name  Quantity\nTritanium  1000000\n…"}
          />
        </Form.Group>

        <div className="appr-side-col">
          <Form.Group className="calc-form-group" controlId="appraisalComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              className="appr-comment"
              value={props.comment}
              onChange={(e) => props.setComment(e.target.value)}
              placeholder="Optional note…"
            />
          </Form.Group>
          <Button variant="secondary" className="w-100 mt-2" onClick={props.calculateAppraisal}>
            {props.isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />{" "}
                Calculating…
              </>
            ) : (
              "Appraise"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AppraisalText;
