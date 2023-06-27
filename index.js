require("dotenv").config();
const _ = require("lodash");
const fs = require("fs");
const textToSpeech = require("@google-cloud/text-to-speech");
const client = new textToSpeech.TextToSpeechClient();

const getTextToSpeech = async(inputText) => {
  const request = {
    input: {
      text: inputText,
    },

    voice: {
      languageCode: "en-US",
      ssmlGender: "NEUTRAL",
    },

    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  const outputFileName = "output.mp3";

  // fs.writeFileSync(outputFileName, "")
  
  await client
    .synthesizeSpeech(request)
    .then(async (response) => {
      console.log(response);
      const audioContent = _.get(response[0], "audioContent");

      if (audioContent) {
        await fs.writeFileSync(outputFileName, audioContent, "binary");
        console.log(
          `Audio content successfully written to file: ${''}`
        );
      } else {
        console.log("Failed to get audio content");
      }
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
};

module.exports = getTextToSpeech;