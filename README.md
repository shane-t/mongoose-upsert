#Mongoose upsert

A Schema plugin that adds an upsert method to a model generate from that schema. It is simply a shortcut to

    Model.update( { query }, { doc }, { upsert : true } )

Installation

    npm install mongoose-upsert

Usage 

    var upsert = require('mongoose-upsert');
    var MySchema = new Schema({ ... });
    MySchema.plugin(upsert);
    My = mongoose.model('My', MySchema);

    ...

    My.upsert({ _id : 123 }, { somevalue : "New or initial value" });
