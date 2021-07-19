import Joi from "joi";
import Jimp from "jimp";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../common/supabase";
import mailgun from "../../common/mailgun";
import certificate from "../../common/templates/certificate";
import AWS from "aws-sdk";
import { valueScaleCorrection } from "framer-motion/types/render/dom/projection/scale-correction";

AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-south-1",
});
export default async function createCertificate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const schema = Joi.object({
      email: Joi.string().required(),
      eventName: Joi.string()
        .valid("Autogenix", "Mechenzie", "E-Sports", "Cloudnet", "Cloudnet-COE")
        .required(),
    });
    const { value, error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      throw {
        status: 422,
        message: "Invalid Input",
      };
    } else {
      console.log(value);
      let x = 750,
        y = 400,
        x1 = 40,
        y1 = 20;
      if (value.eventName === "Cloudnet") {
        (x = 340), (y = 500);
        (x1 = 400), (y1 = 20);
      }
      if (value.eventName === "Cloudnet-COE") {
        (x = 700), (y = 500);
        (x1 = 400), (y1 = 40);
      }
      try {
        const { data, error } = await supabase
          .from("config")
          .select()
          .eq("eventName", value.eventName);
        const certificateUrl = data[0].url;
        const colour = data[0].colour;
        if (error) {
          res.status(500).json({
            message: "Error in loading config",
          });
        } else {
          console.log(value.eventName);
          const { data, error } = await supabase
            .from("certificate-details")
            .select()
            .eq("email", value.email)
            .eq("eventName", value.eventName);
          console.log(data);
          if (error || data.length === 0) {
            console.log("Error");
            console.log(error);
            res.status(404).json({
              message: "Not found",
            });
            return;
          }
          const fileName = `${data[0].name.replace(
            /\s/g,
            ""
          )}-${value.eventName.replace(/\s/g, "")}`;
          console.log(fileName);
          const location =
            process.env.HOST + `/open-sans-64-black/open-sans-64-black.fnt`;
          console.log(location);
          const image = await Jimp.read(certificateUrl);

          image.resize(1920, 1080);

          const imageObject = await image.print(
            await Jimp.loadFont(location),
            x,
            y,
            data[0].name
          );

          await image.print(
            await Jimp.loadFont(
              process.env.HOST + `/open-sans-16-black/open-sans-16-black.fnt`
            ),
            x1,
            y1,
            `Check for validity at ${process.env.HOST}/verify/${data[0].certificateId}`
          );
          await uploadToS3(fileName, image);
          const s3Url = `${process.env.S3_URL}${fileName}`;
          await mailgun(
            value.email,
            "Our minions have got a parcel for you",
            certificate(s3Url)
          );
          console.log(s3Url);
          res.status(201).json({
            message: "Get Certificate",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(e.status || 500).json({
          message: e.message || "An unexpected error occurred",
        });
      }
    }
  } catch (e) {
    console.log(e.message);
    console.log(e);
    res.status(e.status || 500).json({
      message: e.message || "An unexpected error occurred",
    });
  }
}

const uploadToS3 = async (name: string, image: any): Promise<void> => {
  const object = await image.getBufferAsync(Jimp.MIME_PNG);
  let params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
    Body: object,
    ContentType: Jimp.MIME_PNG,
    ACL: "public-read",
  };
  try {
    let uploadPromise = await new AWS.S3().putObject(params).promise();
    console.log("Successfully stored in bucket");
  } catch (e) {
    console.log("Error uploading data: ", e);
    throw { message: "Unable to add to bucket", status: 500 };
  }
};
