import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
},{
   timestamps: true,   // con esta opcion muestra la fecha de creacion y fecha de modificacion

});

export default mongoose.model("Category", categorySchema);