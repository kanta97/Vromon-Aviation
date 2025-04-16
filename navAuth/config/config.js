const config = {
  notification: {
    email: "https://dwwp1.api.infobip.com/email/1/send",
    sms: "https://dwwp1.api.infobip.com/sms/2/text/single",
    dispatcher: "http://148.72.212.173:3000/notification/dispatcher",
    file_base_path:
      "/home/navigatortourism/public_html/prod/services/triptionary-server/",
    from_email: "info@booking.navigatortourism.com",
    from_sms: "8804445653045",
    /* from_email:"info@navigatortourism.com",
     */
  },
};

module.exports = config;
