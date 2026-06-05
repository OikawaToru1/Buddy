import {Schema, model} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const fileSchema = new Schema({
    fileId : { type: String, required: true, unique: true, index: true },
    fileName : { type: String, required: true },
    path : { type: String, required: true },
    owner : { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps: true});

fileSchema.plugin(mongooseAggregatePaginate);

export const File = model("File",fileSchema);


