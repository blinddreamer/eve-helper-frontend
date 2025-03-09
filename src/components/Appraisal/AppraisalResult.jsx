import Table from "react-bootstrap/Table";
import Animated from "../Animated";

function AppraisalResult(props) {
  let volumeFormat = new Intl.NumberFormat();
  let priceFormat = new Intl.NumberFormat("en-US");

  function formatPrice(price) {
    if (price >= 1e9) {
      return (price / 1e9).toFixed(1) + "B"; // Convert to billion and add "B"
    } else if (price >= 1e6) {
      return (price / 1e6).toFixed(1) + "M"; // Convert to million and add "M"
    } else if (price >= 1e3) {
      return (price / 1e3).toFixed(1) + "K"; // Convert to thousand and add "K"
    } else {
      return price.toFixed(0); // Otherwise, return as it is
    }
  }

  return (
    <Animated>
      <div id="appraisalformresult">
        <div id="appraisalResponse">
          <h5>
            {props.appraisal.system} {props.appraisal.pricePercentage}% @{" "}
            {props.appraisal.market === "10000002_60003760"
              ? "Jita 4-4"
              : "Amar"}{" "}
            {props.appraisal.transactionType}
          </h5>
          <div id="apholddiv">
            <div id="appraisaltop">
              <div id="appraisaltopbuy">
                {" "}
                buy:
                <span id="apbuy">
                  {formatPrice(
                    props.appraisal.appraisalResult.estimateTotalBuy *
                      (props.pricePercentage / 100)
                  )}
                </span>
              </div>
              <div id="appraisaltopsplit">
                {" "}
                split:
                <span id="apaverage">
                  {formatPrice(
                    props.appraisal.appraisalResult.estimateTotalSplit *
                      (props.pricePercentage / 100)
                  )}
                </span>
              </div>
              <div id="appraisaltopsell">
                {" "}
                sell:
                <span id="apsel">
                  {formatPrice(
                    props.appraisal.appraisalResult.estimateTotalSell *
                      (props.pricePercentage / 100)
                  )}
                </span>
              </div>
              <div id="appraisaltopvolume">
                {" "}
                volume:
                <span id="apvolume">
                  {formatPrice(
                    props.appraisal.appraisalResult.totalVolume
                  )  +"  m³"} 
                </span>
              </div>
              <div id="appraisalvolumebuy">
                {" "}
                ISK per m³ buy:
                <span id="apbuy">
                  {formatPrice(
                    (props.appraisal.appraisalResult.estimateTotalBuy *
                      (props.pricePercentage / 100)) /
                      props.appraisal.appraisalResult.totalVolume
                  )}
                </span>
              </div>
              <div id="appraisalvolumeaverage">
                {" "}
                split:
                <span id="apaverage">
                  {formatPrice(
                    (props.appraisal.appraisalResult.estimateTotalSplit *
                      (props.pricePercentage / 100)) /
                      props.appraisal.appraisalResult.totalVolume
                  )}
                </span>
              </div>
              <div id="appraisalvolumesell">
                {" "}
                sell:
                <span id="apsel">
                  {formatPrice(
                    (props.appraisal.appraisalResult.estimateTotalSell *
                      (props.pricePercentage / 100)) /
                      props.appraisal.appraisalResult.totalVolume
                  )}
                </span>
              </div>
            </div>
          </div>
          <div id="appraisaltable">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  {/* <th>Unit Volume</th> */}
                  <th>Volume</th>
                  {/* <th>Sell Price</th> */}
                  <th>Sell</th>
                  {/* <th>Buy Price</th> */}
                  <th>Buy</th>
                  {/* <th>Sell/Buy Average</th> */}
                  <th>Split</th>
                </tr>
              </thead>
              <tbody>
                {props.appraisal.appraisalResult.appraisals.map((ap, index) => (
                  <tr key={index}>
                    <td id="appraisaltd">
                      <img src={ap.icon} loading="lazy" />
                    </td>
                    <td id="appraisaltd">{ap.item}</td>
                    <td id="appraisaltd">{volumeFormat.format(ap.quantity)}</td>
                    {/* <td>{volumeFormat.format(ap.volume)} m³</td> */}
                    <td id="appraisaltd">
                      {volumeFormat.format(ap.quantity * ap.volume)} m³{" "}
                    </td>
                    {/* <td>{priceFormat.format(ap.sellOrderPrice)}</td> */}
                    <td id="appraisaltd">
                      {priceFormat.format(
                        ap.quantity *
                          ap.sellOrderPrice *
                          (props.pricePercentage / 100)
                      )}
                    </td>
                    {/* <td>{priceFormat.format(ap.buyOrderPrice)}</td> */}
                    <td id="appraisaltd">
                      {priceFormat.format(
                        ap.quantity *
                          ap.buyOrderPrice *
                          (props.pricePercentage / 100)
                      )}
                    </td>
                    {/* <td>{priceFormat.format(ap.sellBuyOrderAverage)}</td> */}
                    <td id="appraisaltd">
                      {priceFormat.format(
                        ap.quantity *
                          ap.splitPrice *
                          (props.pricePercentage / 100)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <span> *all prices are estimate</span>
        </div>
      </div>
    </Animated>
  );
}
export default AppraisalResult;
