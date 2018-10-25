import { Document, Schema } from 'mongoose';
import * as connections from '../config/connection';
import * as helpers from './_helpers';

export interface IProductModel extends Document {
    name: String;
    category: String;
    price: Number;
    createdAt: Date;
}

export enum Categories {
    Sports,
    Toys,
    Games,
    Cars,
}

const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
        },
        price: {
            type: Number,
            min: 1,
        },
        category: {
            type: String,
            enum: helpers.enumToStrArray(Categories),
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default connections.db.model<IProductModel>('product', ProductSchema);
