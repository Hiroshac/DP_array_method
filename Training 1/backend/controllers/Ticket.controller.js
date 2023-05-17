import TicketModel from "../model/Ticket.Model.js";

//Create Tickets
export const CreateTickets = async (req, res, next) => {
	try {
		const newtickets = new TicketModel({
			TicketID: req.body.TicketID,
			TDscription: req.body.TDscription,
			Amount: req.body.Amount,
			Active: req.body.Active,
			Remark: req.body.Remark,
			Product : req.body.Product,
		});
		await newtickets.save();
		res.status(200).json("Ticket has been created.....");
	} catch (err) {
		next(err);
	}
};