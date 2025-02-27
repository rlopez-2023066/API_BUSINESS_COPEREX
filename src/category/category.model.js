import {Schema, model} from 'mongoose';

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            maxLength: [25, 'Category name must be less than 25 characters'],
        },

        description: {
            type: String,
            required: [true, 'Category description is required'],
            maxLength: [100, 'Category description must be less than 100 characters'],
        }
    }
)

export default model ('Category', categorySchema);