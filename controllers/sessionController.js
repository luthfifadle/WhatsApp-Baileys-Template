const whatsapp = require("../config/whatsapp");

exports.createSession = async (req, res) => {
  try {
    whatsapp.createSession("whatsapp-baileys", false, res);

    // * Multi Device
    // const sessionName = req.body.sessionName;
    // whatsapp.createSession(sessionName, false, res);

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
