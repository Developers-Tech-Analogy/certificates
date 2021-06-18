import Joi from "joi";
import Jimp, { FONT_SANS_10_BLACK } from "jimp";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../common/supabase";
import mailgun from "../../common/mailgun";
import certificate from "../../common/templates/certificate";

export default async function createCertificate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("hello 1");
    const schema = Joi.object({
      email: Joi.string().required(),
      eventName: Joi.string().valid("Autogenix", "Mechenzie").required(),
    });
    const { value, error } = schema.validate(req.body);

    if (error) {
      console.log(error);

      throw {
        status: 422,
        message: "Invalid Input",
      };
    } else {
      try {
        console.log("hello 2");

        const certificateUrl: string =
          "https://s3.ap-south-1.amazonaws.com/org.techanalogy.certificates/Templates/cert-v1.png";
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
        console.log("hello 3");

        let imageResult;
        const fileName = `${data[0].name.replace(
          /\s/g,
          ""
        )}-${value.eventName.replace(/\s/g, "")}`;
        console.log("hello 4");

        console.log(fileName);
        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
          .then((font) => {
            console.log("hello 5");

            Jimp.read(certificateUrl)
              .then((image) => {
                image.print(font, 800, 600, data[0].name);
                let file =
                  `./public/certificates/${fileName}.` + image.getExtension();
                image.write(file);
              })
              .catch((error) => {
                throw {
                  status: 500,
                  message: "Error while reading image",
                };
              });
          })
          .catch((error) => {
            console.log(error);
            throw {
              status: 500,
              message: "Error in loading font",
            };
          });
        // mailgun(
        //   value.email,
        //   "Our minions have got a parcel for you",
        //   certificate(`${process.env.HOST}/certificates/${fileName}.png`)
        // );
        res.status(201).json({
          message: "Get Certificate",
        });
      } catch (e) {
        console.log(e);
        res.status(e.status || 500).json({
          message: e.message || "An unexpected error occurred",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).json({
      message: e.message || "An unexpected error occurred",
    });
  }
}
