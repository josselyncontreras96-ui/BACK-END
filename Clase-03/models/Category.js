import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required"],
        minLength: [2, "Name must be at least 2 characters"],
        maxLength: [50, "Name must be at most 50 characters"],
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