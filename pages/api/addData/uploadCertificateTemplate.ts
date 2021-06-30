import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import nc from "next-connect";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) =>
      cb(null, `${req.body.username}${path.extname(file.originalname)}`),
  }),
});

const uploadTemplate = nc<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(404).end("page is not found... or is it");
  },
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
})
  .use(cors({ origin: true }))
  .use(upload.single("filename"))
  .post((req, res) => {
    console.log(req.body);
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default uploadTemplate;
