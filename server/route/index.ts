import express from "express";
import { client } from "../database";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../constant/code";

const router = express.Router();

router
  .get("/document.list", (_, res) => {
    client.query("SELECT * FROM documents", (err, result) => {
      if (err) {
        console.error("Query Error: " + err);
        res
          .status(INTERNAL_SERVER_ERROR)
          .send("A wild unhandled error appeared...");
      } else res.json(result.rows);
    });
  })
  .post("/document.create", (req, res) => {
    // todo: body validation
    const { name, body } = req.body;
    if (!name) {
      res.status(BAD_REQUEST).send("Document Name is required");
      return;
    }

    if (!body) {
      res.status(BAD_REQUEST).send("Document body is required");
      return;
    }

    // todo: guard against injection?
    client.query(
      "INSERT INTO documents (name, body) VALUES ($1, $2)",
      [name, body],
      (err, result) => {
        if (err) {
          console.error("Query Error: " + err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(OK).json(result.rows);
        }
      }
    );
  });

export default router;
