import { Schema, models, model } from 'mongoose';
import { generate } from 'shortid';

const UrlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        default: generate,
        unique: true,
    },
    clicked: {
        type: Number,
        required: true,
        default: 0,
    },
});

export const Urls = models.Urls || model('Urls', UrlSchema);
