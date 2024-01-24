import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const apiKey = process.env.RESAS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET以外のリクエストを許可しない
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await axios.get(
      `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
      {
        headers: {
          "X-API-KEY": apiKey,
        },
      }
    );

    const populationData = response.data;

    res.status(200).json(populationData);
  } catch (error) {
    console.error("Error fetching population data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
