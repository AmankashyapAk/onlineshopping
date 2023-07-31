const braintree = require("braintree");
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "t46vy4jb3j723k3n",
  publicKey: "wybmbfpk78kg7xkq",
  privateKey: "0a83acd500f32c00df8a70022a8fd73d",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};

// gateway.clientToken.generate(
//   {
//     customerId: aCustomerId,
//   },
//   (err, response) => {
//     // pass clientToken to your front-end
//     const clientToken = response.clientToken;
//   }
// );

exports.getToken = (req, res) => {
  gateway.clientToken.generate(
    {
      //   customerId: aCustomerId,
    },
    function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
      // pass clientToken to your front-end
      //   const clientToken = response.clientToken;
      // }
    }
  );
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;

  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      //   deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    function (err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.send(result);
      }
    }
  );
};
