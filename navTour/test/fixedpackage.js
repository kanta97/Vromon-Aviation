//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let fixedpackage = require('../model/fixedpackage');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
var insertid;
//Our parent block
describe('fixedpackages', () => {
    beforeEach((done) => { //Before each test we empty the database
        fixedpackage.removeAll({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET fixedpackage', () => {
        it('it should GET all fixedpackage', (done) => {
            chai.request(server)
                .get('/fixedpackage')
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.should.have.status(200);
                    done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe('/POST fixedpackage', () => {
        it('it should not POST a fixedpackage without destination field', (done) => {
            let fixedpackage = {
                origin: "test",
                description: "test",
                start_date: "2019-03-08",
                end_date: "2019-03-08",
                tour_type: "test",
                status: 0,
                itinerary: "test",
                inclusions: "test",
                exclusions: "test",
                minimum_number_people: 2
            }
            chai.request(server)
                .post('/fixedpackage')
                .send(fixedpackage)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql('400 Bad Request');
                    done();
                });
        });
        it('it should POST a fixedpackage ', (done) => {
            let fixedpackage = {
                origin: "",
                destination: "test",
                description: "test",
                start_date: "2019-03-08",
                end_date: "2019-03-08",
                tour_type: "test",
                status: 0,
                itinerary: "test",
                inclusions: "test",
                exclusions: "test",
                minimum_number_people: 2
            }
            chai.request(server)
                .post('/fixedpackage')
                .send(fixedpackage)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('200 OK');
                    res.body.should.have.property('body');
                    res.body.body.should.have.property('msg').eql('insertion successful');
                    insertid = res.body.body.insertid;
                    console.log("insertid = " + insertid);
                    done();
                });
        });
    });
    describe('/GET/:id fixedpackage', () => {
        it('it should GET a fixedpackage by the given id', (done) => {
            
                chai.request(server)
              .get('/fixedpackage/' + insertid)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('body');
                    // res.body.body.should.have.property('id').eql(insertid);
                done();
              });
        
  
        });
    });
   /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id fixedpackage', () => {
        let fixedpackage = {
            origin: "",
            destination: "test",
            description: "test",
            start_date: "2019-03-08",
            end_date: "2019-03-08",
            tour_type: "test",
            status: 0,
            itinerary: "test",
            inclusions: "test",
            exclusions: "test",
            minimum_number_people: 3
        }
        it('it should UPDATE a fixedpackage given the id', (done) => {
                  chai.request(server)
                  .put('/fixedpackage/' + insertid)
                  .send(fixedpackage)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('body').eql('update successful');
                        // res.body.book.should.have.property('').eql(1950);
                    done();
                  });
            
        });
    });

});