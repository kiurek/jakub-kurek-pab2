import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import zamowienieModels from "../models/zamowienie.models";
import pracownikModels from "../models/pracownik.models";
import restauracjaModels from "../models/restauracja.models";

const createZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const { pracownik, dania, status, stolik, kwota } = req.body;

  const zamowienie = new zamowienieModels({
    _id: new mongoose.Types.ObjectId(),
    pracownik,
    dania,
    status,
    stolik,
    kwota,
  });
  return zamowienie
    .save()
    .then((zamowienie) => res.status(201).json({ zamowienie }))
    .catch((error) => res.status(500).json({ error }));
};

const readZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const zamowienieId = req.params.zamowienieId;

  return zamowienieModels
    .findById(zamowienieId)
    .populate(["pracownik", "stolik"])
    .then((zamowienie) =>
      zamowienie
        ? res.status(200).json({ zamowienie })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return zamowienieModels
    .find()
    .populate(["pracownik", "stolik"])
    .then((zamowienie) => res.status(200).json({ zamowienie }))
    .catch((error) => res.status(500).json({ error }));
};

const readStolikId = (req: Request, res: Response, next: NextFunction) => {
  const stolikId = req.params.stolikId;

  return zamowienieModels
    .find()
    .where(stolikId)
    .populate(["pracownik", "stolik"])
    .then((zamowienie) =>
      zamowienie
        ? res.status(200).json({ zamowienie })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readPracownikId = (req: Request, res: Response, next: NextFunction) => {
  const pracownikId = req.params.pracownikId;

  return zamowienieModels
    .find()
    .where(pracownikId)
    .populate(["pracownik", "stolik"])
    .then((zamowienie) =>
      zamowienie
        ? res.status(200).json({ zamowienie })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};
const updateZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const zamowienieId = req.params.zamowienieId;

  return zamowienieModels
    .findById(zamowienieId)
    .then((zamowienie) => {
      if (zamowienie) {
        zamowienie.set(req.body);

        return zamowienie
          .save()
          .then((zamowienie) => res.status(201).json({ zamowienie }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const zamowienieId = req.params.zamowienieId;

  return zamowienieModels
    .findByIdAndDelete(zamowienieId)
    .then((zamowienie) =>
      zamowienie
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createZamowienie,
  readZamowienie,
  readAll,
  readPracownikId,
  readStolikId,
  updateZamowienie,
  deleteZamowienie,
};
