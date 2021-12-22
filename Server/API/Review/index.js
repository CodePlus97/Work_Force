// Libraries
import express from "express";

// Database Model
import { ReviewModel } from "../../database/allModels.js";

const Router = express.Router();

/**
 * Route        /:workerid
 * Des          GET all reviews for a particular worker
 * Params       workerid
 * Access       Public
 * Method       GET
 */
Router.get("/:workerid", async (req, res) => {
  try {
    const { workerid } = req.params;
    const reviews = await ReviewModel.find({ Workers: workerid });

    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /new
 * Des          POST: Adding new worker review and rating
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/new", async (req, res) => {
  try {
    const { reviewData } = req.body;

    await ReviewModel.create({ ...reviewData });

    return res.json({ reviews: "Successfully Created Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /delete/:id
 * Des          Delete a specific review
 * Params       _id
 * Access       Public
 * Method       DELETE
 */
Router.delete("/delete/:id", async (req, res) => {
  try {
    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Sucessfully deleted the review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
