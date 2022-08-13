import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    clientName : String,
    clientEmail : String,
    contact : Number,
    description : String,
    domain : String,
    projectValue : Number,
    investors : {
        type : [String],
        default : [],
    },
    postedAt: {
        type: Date,
        default: new Date()
    }
})

var ProjectData = mongoose.model('ProjectData', projectSchema);

export default ProjectData;