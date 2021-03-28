import { EditorController } from "../../server/controllers/EditorController";
import staticJson from "../../data/editor.json";

export default async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.stringify(req.body);
    try {
      await EditorController.save(JSON.parse(data));
      res.status(201).json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else if (req.method === "GET") {
    try {
      const result = await EditorController.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ data: staticJson, err: error });
    }
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10240kb",
      // extended: true,
    },
  },
};
