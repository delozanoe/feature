var express = require("express");
const Joi = require("joi");
const router = express.Router();
//TODO challenge express
/**Procesamiento de datos */
const messages = [
  { id: 1, message: "Nestle is so nice", author: "Dan Lozano",ts: "123456798" },
  { id: 2, message: "Nestle is so nice", author: "Esteban Lozano",ts: "98765431" },
  { id: 3, message: "Nestle is so nice", author: "Humberto Lozano",ts: "89453161" },
];

router.get("/", (req, res) => {
res.send(messages);
});

router.get("/:ts", (req, res) => {
const message = messages.find((c) => c.ts === req.params.ts);
if (!message)
  return res.status(404).send("The message with the given tf was not found.");
res.send(message);
});

router.post("/", (req, res) => {
  //El mensaje no puede tener menos de 5 caracteres
const schema = Joi.object({
  message: Joi.string().min(5).required(),
  author: Joi.string().required(),
  ts: Joi.number().required()
});

const { error } = schema.validate(req.body);

if (error) {
  return res.status(400).send(error);
}
//fAL
const message = {
  id: messages.length + 1,
  message: req.body.message,
  author: req.body.author,
  ts: req.body.ts
};

messages.push(message);
res.send(message);
});

router.put("/:ts", (req, res) => {
const message = messages.find((c) => c.ts === req.params.ts);
if (!message)
  return res.status(404).send("The client with the given id was not found.");

const schema = Joi.object({
  message: Joi.string().min(5).required(),
  author: Joi.string().required(),
});

const { error } = schema.validate(req.body);

if (error) {
  return res.status(400).send(error);
}

message.message = req.body.message;
message.author = req.body.author;

res.send(message);
});

router.delete("/:ts", (req, res) => {
const message = messages.find((c) => c.ts === req.params.ts);
if (!message)
  return res.status(404).send("The message with the given id was not found.");

const index = messages.indexOf(message);
messages.splice(index, 1);

res.send(message);
});

module.exports = router;