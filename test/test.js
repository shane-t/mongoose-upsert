const mocha    = require('mocha');
const expect   = require('chai').expect;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const upsert   = require('../');


before(done => {
  mongoose.connect('mongodb://localhost/upsert')
    .then(done);
});


after(done => {
  mongoose.connection.db.dropDatabase().then( () => done() );
});

var TestThingSchema = new Schema({
  _id   : Number,
  value : String
});


TestThingSchema.plugin(upsert);

var TestThing = mongoose.model("TestThing", TestThingSchema);

describe('#upsert', done => {

  it('should create a document if nothing matches the query and return a promise', done => {

    var ret = TestThing.upsert({ _id : 123 }, { value : "Beep" })

    expect(typeof ret.then).to.equal('function');

    ret.then(result => {

      console.log(result);
      done();

    });

  });

  it('should update a document if it is already there', done => {


    TestThing.upsert({ _id : 123 }, { value : "Boop" })
      .then( r => TestThing.findOne({ _id : 123 }) )
      .then( doc => {
        expect(doc._id).to.equal(123);
        expect(doc.value).to.equal("Boop");
        done();
      })
      .catch(err => console.error(err));


  });

  it('should call a callback if it is provided', done => {

    function callback () {
      done();
    }

    TestThing.upsert({ _id : 123}, { value : "Bop" }, callback);


  });


});

