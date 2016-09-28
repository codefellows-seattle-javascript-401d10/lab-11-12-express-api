// 'use strict';
//
// const exampleNote = {
//   name:'example',
//   content: 'demo text',
// };
//
// describe('testing GET request')
// //after needed for post request
// describe('testing POST request to api/note', function() {
//   describe('with a valid body', function(){
//     after(done => {
//       if (this.tempNote){
//         Note.deleteNote(this.tempNote.id)
//         .then(() => done())
//         .catch(err => done(err));
//       }
//     });
//     it ('should return a note', => {
//       request.post(localhosturl)
//       .send(exampleNote)
//       .end((err,res) => {
//         if (err) return done(err);
//         expect(res.status).to.equal(200)
//         expect(!!res.body.id).to.equal(true)
//         expect(res.body.name).to.equal(exampleNote.name)
//         //so that the after block knows what to delete
//         this.tempNote = res.body
//       })
//     })
//
//   })
// })
//
// //then the put request stuff
// //have to create something and then try and update it for the put request
// before(done => {
//   Note.createNote(exampleNote)
//   .then(note => {
//     this.tempNote = note;
//     done();
//   })
//   .catch(err => done(err));
// })
//
// after(done => {
//   if (this.tempNote) {
//     Note.deleteNote(this.tempNote.id)
//     .then(() => done());
//     //following line is same as calling done with the error, at least in mocha
//     //same as catch(err => done(err));
//     catch(done);
//   }
// })
//
// it('should return a note', () => {
//   let updateData = {name: 'up date', content: 'fizzbuzz'}
//   request.put(url/api/note?id=${this.tempNote.id})
//   .send(updateData)
//   .end((err, res) => {
//     if (err) done(err);
//     //want to test every property
//     expect(res.status).to.equal(200);
//     expect(res.body.id).to.equal(this.tempNote.id);
//     expect(res.body.name).to.equal(updateData.name);
//     expect(res.body.content).to.equal(updateData.content);
//     //for (var key in updateData) expect(res.body[key].to.equal(updateData[key]))
//   });
//   done();
// })
