import mongoose from "mongoose";

const Ticket = new mongoose.Schema({
    TicketID : {
        type : String,
    },
    TDscription : {
       type : String,

    },
    Amount : {
        type : String,
    },
    Active : {
        type : String,
    },
    Remark : {
        type : String,
    },
    Product :[{

        PName : {
            type : String,
        },
        PPrice : {
                type : String, 
        }
    }
    
    ]
});

export default mongoose.models.tickets || mongoose.model('tickets',Ticket);
