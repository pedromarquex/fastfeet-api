import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {

  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))){
      return res.status(400).json({ error: "Validation fails" });
    }
    const recipient = await Recipient.create(req.body);

    return res.status(201).json({recipient});
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: "Validation fails" });
    }

    const { pk } = req.params;

    const recipient = await Recipient.findByPk(pk);

    if(!recipient) {
      return res.status(404).json({ error: "Recipient does not exists" });
    }

    recipient.update(req.body);

    return res.json(recipient);
  }

  async destroy(req, res) {
    const { pk } = req.params;

    const recipient = await Recipient.findByPk(pk);

    if(!recipient) {
      return res.status(404).json({ error: "Recipient does not exists" });
    }

    await recipient.destroy();

    return res.status(200).send();
  }
}

export default new RecipientController();
