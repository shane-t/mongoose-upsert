/* Mongoose upsert
 * Copyright 2016 Shane Terence Odlum <me@shanet.ie>
 * MIT License
 *
 */


module.exports = function (schema, options) {

  schema.statics.upsert = function (query, doc, options, cb) {

    /* Normalise arguments */

    if (arguments.length < 4) {
      if (typeof options == "function") {
        cb = options;
        options = {};
      }
      if (typeof option == "undefined") {
        options = {};

      }
    }


    options.upsert = true;

    return this.update(query, doc, options, cb);

  };


};
