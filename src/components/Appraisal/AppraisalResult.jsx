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
      <div id="appraisalResponse">
        <div id="apholddiv">
          <table id="apmaindiv">
            <tr>
              <td>
                BUY:
                <span id="apbuy">
                  {formatPrice(props.appraisal.estimateTotalBuy * (props.pricePercentage/100))}
                </span>
              </td>
              <td>
                SPLIT:
                <span id="apaverage">
                  {formatPrice(props.appraisal.estimateTotalSplit * (props.pricePercentage/100))}
                </span>
              </td>
              <td>
                SELL:
                <span id="apsel">
                  {formatPrice(props.appraisal.estimateTotalSell * (props.pricePercentage/100))}
                </span>
              </td>
              <td>
                VOLUME:
                <span id="apvolume">
                  {volumeFormat.format(props.appraisal.totalVolume)}
                  m³
                </span>
              </td>
            </tr>
          </table>
        </div>
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
            {props.appraisal.appraisals.map((ap, index) => (
              <tr key={index}>
                <td><img src={ap.icon} loading="lazy" /></td>
                <td>{ap.item}</td>
                <td>{volumeFormat.format(ap.quantity)}</td>
                {/* <td>{volumeFormat.format(ap.volume)} m³</td> */}
                <td>{volumeFormat.format(ap.quantity * ap.volume)} m³ </td>
                {/* <td>{priceFormat.format(ap.sellOrderPrice)}</td> */}
                <td>{priceFormat.format((ap.quantity * ap.sellOrderPrice) * (props.pricePercentage/100))}</td>
                {/* <td>{priceFormat.format(ap.buyOrderPrice)}</td> */}
                <td>{priceFormat.format((ap.quantity * ap.buyOrderPrice) * (props.pricePercentage/100))}</td>
                {/* <td>{priceFormat.format(ap.sellBuyOrderAverage)}</td> */}
                <td>{priceFormat.format((ap.quantity * ap.splitPrice) * (props.pricePercentage/100))}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <span> *all prices are estimate</span>
        <div id="iskPerVol">
          <table id="apmaindiv">
            <tr>
              <td>
                ISK PER m³ BUY:
                <span id="apbuy">
                  {formatPrice(props.appraisal.estimateTotalBuy * (props.pricePercentage/100) / props.appraisal.totalVolume)}
                </span>
              </td>
              <td>
                ISK PER m³ SPLIT:
                <span id="apaverage">
                  {formatPrice(props.appraisal.estimateTotalSplit * (props.pricePercentage/100) / props.appraisal.totalVolume)}
                </span>
              </td>
              <td>
               ISK per m³ SELL:
                <span id="apsel">
                  {formatPrice(props.appraisal.estimateTotalSell * (props.pricePercentage/100) / props.appraisal.totalVolume)}
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Animated>
  );
}
export default AppraisalResult;
