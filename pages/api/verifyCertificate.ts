import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../common/supabase";

export default async function verifyCertificate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const schema = Joi.object({
      id: Joi.string().length(10).required(),
    });
    const { value, error } = schema.validate(req.body);
    console.log(value);
    if (error) {
      console.log(error);
      throw {
        status: 422,
        message: "Invalid Input",
      };
    } else {
      const { data, error } = await supabase
        .from("certificate-details")
        .select()
        .eq("certificateId", value.id);
      if (data.length === 0) {
        res.status(404).json({
          message: "Certificate does not exist",
        });
      } else {
        res.status(200).json({
          message: "Certificate Found",
          participant: data[0],
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
