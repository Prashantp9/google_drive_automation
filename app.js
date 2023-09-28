const { google } = require("googleapis");
const { cloudfunctions } = require("googleapis/build/src/apis/cloudfunctions");

const path = require("path");
const fs = require("fs");
const CLIENT_ID =
  "206449389242-gcfm87atbaf9tffc1rteeqejhn8nlb9u.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN =
  "1//04CYLK_IEqNBjCgYIARAAGAQSNwF-L9Ir_D1FtQNegvVdvhpr75zOwteUlUfA2II14YsRqS-xq9LAtR1S5hkSCLp1OPk9xpIcPtc";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
const filepath = path.join(__dirname, "controller.jpg");
const folderName = ""

const uploadTODrive = async () => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "controller.jpg",
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filepath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

uploadTODrive();
