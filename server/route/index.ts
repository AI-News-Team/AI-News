import express from "express";
import { client } from "../database";
import { FORBIDDEN } from "../constant/code";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../constant/code";

const router = express.Router();

// todo: create a meaningful abstraction for routing and database queries

router
  .get("/article.list", (_, res) => {
    client.query("select * from Article", (err, result) => {
      if (err) {
        console.error("Query Error: " + err);
        res
          .status(INTERNAL_SERVER_ERROR)
          .send("A wild unhandled error appeared...");
      } else res.json(result.rows);
    });
  })
  .post("/article.create", (req, res) => {
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
      "insert into Article (name, body) values ($1, $2)",
      [name, body],
      (err, result) => {
        if (err) {
          console.error("Query Error: " + err);
          res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
        } else {
          console.log(result);
          res.status(OK).json(result.rows);
        }
      }
    );
  })
  .delete("/article.delete", (req, res) => {
    res.status(FORBIDDEN).json();
  })
  .put("/article.mutate", (req, res) => {
    res.status(FORBIDDEN).json();
  });

export default router;
