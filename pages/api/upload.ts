import { UploadController } from "../../server/controllers/UploadController";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry can't be loaded ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(UploadController.upload().single("file"));

apiRoute.post((req: NextApiResponse & { file: { filename: string } }, res) => {
  setTimeout(() => {
    res.status(200).json({ link: `/uploads/${req.file.filename}` });
  }, 1500);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
