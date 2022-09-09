import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import dishRoutes, { route } from "./routes/dish.routes";
import pracownikRoutes from "./routes/pracownik.routes";
import produktRoutes from "./routes/produkt.routes";
import restauracjaRoutes from "./routes/restauracja.routes";
import rezerwacjaRoutes from "./routes/rezerwacja.routes";
import stolikRoutes from "./routes/stolik.routes";
import zamowienieRoutes from "./routes/zamowienie.routes";

const router = express();

//Mongo Connection
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to mongoDB.");
    StartSever();
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

// Start the server only if Mongo connects

const StartSever = () => {
  router.use((req, res, next) => {
    //Log the request
    Logging.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      //Log the response
      Logging.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // API rules
  router.use((req, res, next) => {
    res.header("Access-Controll-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use("/dishes", dishRoutes);
  router.use("/pracownicy", pracownikRoutes);
  router.use("/produkty", produktRoutes);
  router.use("/restauracja", restauracjaRoutes);
  router.use("/rezerwacje", rezerwacjaRoutes);
  router.use("/stoliki", stolikRoutes);
  router.use("/zamowienia", zamowienieRoutes);

  // Healtcheck
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  // Error handling
  router.use((req, res, next) => {
    const error = new Error("not found");
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`)
    );
};
