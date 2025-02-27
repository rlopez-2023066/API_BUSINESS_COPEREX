import {Schema, model} from 'mongoose'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength:[25, `Can't be overcome 25 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength:[25, `Can't be overcome 25 characters`]
        },

        username:{
            type:String,
            required:[true, 'Username is required'],
            unique: [true, 'Username is already taken'],
            lowercase: true,
            maxLength:[25, `Can't be overcome 25 characters`]
        },

        email:{
            type:String,
            required:[true, 'Email is required'],
            unique: true
        },

        password:{
            type:String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters'],
            maxLength:[100, `Can't be overcome 25 characters`]
        },

        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMINISTRADOR'],
        }
    }
)

export default model ('User', userSchema);