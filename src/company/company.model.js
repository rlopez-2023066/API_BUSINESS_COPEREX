import {Schema, model} from 'mongoose'

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [30, 'Name must be less than 30 characters'],
        },

        address: {
            type: String,
            required: [true, 'Address is required'],
            maxLength: [100, 'Address must be less than 100 characters'],
        },

        phone:{
            type: Number,
            required: [8, 'Phone number is required'],
            maxLength: [9, 'Phone number must be less than 9 digits'],
        },

        yearExperience: {
            type: Number,
            required: [true, 'Year of experience is required'],
        },

        impactLevel: {
            type: Number,
            required: [true, 'Impact level is required'],
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: true
        }
    }
)

export default model ('Company', companySchema)