import { EditorController } from "./../../controllers/EditorController";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  if (req.method === "POST") {
    const { data } = req.query;
    try {
      await EditorController.save(JSON.parse(data));
      res.status(201).json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else if (req.method === "GET") {
    try {
      const result = await EditorController.getAll();
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
};
