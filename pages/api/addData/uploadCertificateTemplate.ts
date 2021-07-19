import { NextApiRequest, NextApiResponse } from "next";
import cors from "cors";
import nc, { RequestHandler } from "next-connect";
import multer from "multer";
import path from "path";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import supabase from "../../../common/supabase";
import Joi from "joi";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-south-1",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      ((req as unknown as any).body.url = `${process.env.S3_URL}${
        (req as unknown as any).body.eventName
      }${path.extname(file.originalname)}`),
        cb(
          null,
          `${(req as unknown as any).body.eventName}${path.extname(
            file.originalname
          )}`
        );
    },
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
  .post(async (req, res) => {
    const Schema = Joi.object({
      eventName: Joi.string().required(),
      colour: Joi.string().required(),
      url: Joi.string().required(),
      yc: Joi.number().required(),
      xc: Joi.number().required(),
    });
    const { value, error } = Schema.validate(req.body);
    if (error)
      res.status(422).json({
        success: false,
        message: error.message || "unable to add to database",
      });
    else {
      const { data, error } = await supabase.from("config").insert(req.body);
      if (error)
        res.status(500).json({
          success: false,
          message: error.message || "unable to add to database",
        });
      else res.status(201).json({ message: "event data added", success: true });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default uploadTemplate;
