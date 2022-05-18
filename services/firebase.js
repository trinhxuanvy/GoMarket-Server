const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const dotenv = require("dotenv");
const uuid = require("uuid");

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MESSAGING_SENDER_ID,
};

initializeApp(firebaseConfig);

const storage = getStorage();
const metadata = {
  contentType: "image/jpg",
};

exports.uploadImage = (req, res, next) => {
  const buffer = Buffer.from(req.body.image, "base64");
  const originalName = req.body.originalName;
  const storageRef = ref(storage, "images/" + uuid.v4());
  const uploadTask = uploadBytesResumable(storageRef, buffer, metadata);
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      var interval = setInterval(function () {
        res.write("data: " + progress + "\n\n");
      }, 0);

      // close
      res.on("close", () => {
        clearInterval(interval);
        res.end();
      });
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        res.send(downloadURL);
      });
    }
  );
};

exports.deleteImage = (imageUrl) => {
  let fileRef = ref(storage, imageUrl);
  deleteObject(fileRef)
    .then(() => {
      console.log("success");
    })
    .catch((err) => {
      console.log("Fail");
    });
};
