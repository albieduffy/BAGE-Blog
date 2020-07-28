const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http')
const rewire = require('rewire');

let app = rewire('../app.js');

chai.use(chaiHttp);
chai.should();

describe('Routes', () => {
  describe('GET /', () => {

    it("should get home route", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.text).to.eql('Hello world!');
          done();
        });
    });

    it("should return all blogs", (done) => {
      chai.request(app)
        .get('/blogs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should create new blog", (done) => {
      chai.request(app)
        .post('/blogs/new')
        .send({"blogs":{"title":"hello"}})
        // .expect(200)        
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should return comments", (done) => {
      chai.request(app)
        .get('/blogs/1/comments')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
      });

    it("should create new comment", (done) => {
      chai.request(app)
        .post('/blogs/1/comments')
        .end((err, req) => {
          req.body.should.be.a('object');
          req.should.have.status(200);
          done();
        });
    });

    it("should return search results", (done) => {
      chai.request(app)
      .get('/blogs/search?q=technology')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });

    it("should return no search results", (done) => {
      chai.request(app)
      .get('/blogs/search?q=supercalifragilisticexpialidocious')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        expect(res.text).to.eql(`"supercalifragilisticexpialidocious" did not return any results!`);
        done();
      });
    });

  })
})
