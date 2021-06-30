import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../common/supabase";

export default async function fetchEventNames(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase.from("config").select("eventName");
    if (error) throw { message: error.message, status: 502 };
    res
      .status(200)
      .json({ success: true, message: "data fetched", data: data });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
}
