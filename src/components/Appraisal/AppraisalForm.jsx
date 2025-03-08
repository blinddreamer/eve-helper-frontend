import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Animated from "../Animated";
import { Clipboard } from "react-bootstrap-icons";


function AppraisalForm(props) {
  const handlePercentChange = (e) => {
    let value = parseFloat(e.target.value);

  // Ensure the value is within the allowed range
  if (isNaN(value)) return; // Ignore non-numeric values
  if (value < 0.25) value = 0.25;
  if (value > 200) value = 200;

  props.setPricePercentage(value); // Update the state
  };

  const handleMarketChange = (e) => {
    props.setMarket(e.target.value);
  }
  return (
    <Animated>
      <div id="appraisalForm">
        {props.errorMessage && <Alert>{props.errorMessage}</Alert>}
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
          <Form.Group controlId="marketRegion">
            <Form.Label>Market Region:</Form.Label>
            <Form.Select
              key="appraisal-select"
              aria-label="Default select example"
              onChange={handleMarketChange}
            >
              {props.stations.map((station, index) => {
                return (
                  <option
                    key={index}
                    selected={station.regionId+"_"+station.stationId === props.market}
                    value={station.regionId+"_"+station.stationId}
                  >
                    {station.regionName+" - " + station.stationName}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="slider-price">
      <Form.Label>Price Percentage</Form.Label>
      <Form.Control
        type="number"
        min={0.25}
        max={200}
        step={0.25}
        value={props.pricePercentage}
        onChange={handlePercentChange} // Update state when input changes
      />
      </Form.Group>

       <Form.Group controlId="orderType">
       <div key={`inline-radio`} className="mb-3"> 
              <Form.Check inline type="radio" label="Buy" aria-label="radio 1" value={"buy"} id={`inline-radio-1`}  checked={props.transactionType === "buy"}
                onChange={(e) => props.setTransactionType(e.target.value)}/> 
              <Form.Check inline type="radio" label="Sell" aria-label="radio 1" value={"sell"} id={`inline-radio-2`}  checked={props.transactionType === "sell"}
                onChange={(e) => props.setTransactionType(e.target.value)}/> 
              <Form.Check inline type="radio" label="Split" aria-label="radio 1" value={"split"} id={`inline-radio-3`}  checked={props.transactionType === "split"}
                onChange={(e) => props.setTransactionType(e.target.value)}/>
                </div>
          
          </Form.Group>
    
    <Form.Group controlId="appraisalComment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              key="app-comment"
              as="textarea"
              name="comment"
              value={props.comment}
              onChange={(e) => {
                props.setComment(e.target.value);}}
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
          <Button disabled={!props.uuid} onClick={props.handleCopy} variant="outline">
      <Clipboard className="mr-2 h-4 w-4" />
      Copy URL
    </Button>
        </Form>
      </div>
    </Animated>
  );
}
export default AppraisalForm;
