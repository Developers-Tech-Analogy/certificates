import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../common/supabase";
import { customAlphabet } from "nanoid";
import cors from "cors";

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
  10
);

const Schema = Joi.object().keys({
  data: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      eventName: Joi.string().required(),
    })
  ),
});

const corsVar = cors({ origin: true });

const addParticipants = async (req: NextApiRequest, res: NextApiResponse) => {
  corsVar(req, res, async () => {
    try {
      if (req.method !== "POST")
        throw { code: 405, message: "Invalid http method" };
      let { value, error } = Schema.validate(req.body);
      if (error) throw { code: 422, message: error.message };
      value.data.forEach((e, index) => {
        value.data[index].certificateId = nanoid();
      });
      let { data, ...err } = await supabase
        .from("certificate-details")
        .insert(value.data);
      if (err.error) {
        console.log(err.error);
        throw { code: 500, message: "Unable to insert data to database" };
      }
      res.status(200).json({
        success: true,
        message: "Successfully stored the data in db",
      });
    } catch (err) {
      console.log(err);
      res.status(err.code || 500).json({
        message: err.message || "internal server error",
        success: false,
      });
    }
  });
};
export default addParticipants;
