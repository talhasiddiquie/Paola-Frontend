import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { PayPalButton } from "react-paypal-button-v2";
import PaymentIcon from "@material-ui/icons/Payment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Donate = () => {
  const [amount, setAmount] = useState("");
  const [paypalActive, setPaypalActive] = useState(false);

  return (
    <div className="modal-donate">
      <p className="modal-header">
        <PaymentIcon />
        Donate
        {paypalActive ? (
          <IconButton
            className="modal-back-icon"
            size="large"
            onClick={() => setPaypalActive(false)}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        ) : null}
      </p>

      {paypalActive ? (
        <PayPalButton
          amount="0.01"
          onSuccess={(details, data) => {
            alert("Transaction completed");
          }}
          options={{
            clientId: process.env.NODE_ENV.PAYPAL_CLIENT_ID,
          }}
        />
      ) : (
        <>
          <TextField
            fullWidth
            value={amount}
            placeholder="$25"
            variant="outlined"
            label="Your amount"
          />
          <br />

          <div className="modal-donate-button-grid">
            <div>
              <Button
                onClick={() => setAmount(25)}
                fullWidth
                size="large"
                variant="contained"
              >
                $25
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setAmount(50)}
                fullWidth
                size="large"
                variant="contained"
              >
                $50
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setAmount(75)}
                fullWidth
                size="large"
                variant="contained"
              >
                $75
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setAmount(100)}
                fullWidth
                size="large"
                variant="contained"
              >
                $100
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setAmount(125)}
                fullWidth
                size="large"
                variant="contained"
              >
                $125
              </Button>
            </div>
            <div>
              <Button
                onClick={() => setAmount(150)}
                fullWidth
                size="large"
                variant="contained"
              >
                $150
              </Button>
            </div>
          </div>

          <Button
            variant="contained"
            fullWidth
            size="large"
            color="primary"
            onClick={() => setPaypalActive(true)}
          >
            Donate Now
          </Button>
          <br />
          <br />

          <hr />
          <div className="modal-extra-content">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s. Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s.
            </p>
            <ul>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </li>
            </ul>

            <p>Thank you for your support.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Donate;
