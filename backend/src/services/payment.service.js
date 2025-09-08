const axios = require("axios");
const { mpesaConfig, getAccessToken } = require("../../config/mpesa");

async function initiateSTKPush(phone, amount, accountRef, transactionDesc) {
  const token = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const password = Buffer.from(mpesaConfig.shortcode + mpesaConfig.passkey + timestamp).toString("base64");

  const res = await axios.post(
    `${mpesaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: mpesaConfig.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: mpesaConfig.shortcode,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: accountRef,
      TransactionDesc: transactionDesc
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
}

module.exports = { initiateSTKPush };
