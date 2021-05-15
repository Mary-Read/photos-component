const faker = require('faker');
const s3Methods = require('./S3seed');
const db = require('./database/index.js')

class Photo {
  constructor(itemId, name) {
    this.itemId = itemId;
    this.name = name;
  }
}

let createPhotoSchema = () => {
  console.log('ok')
  let imageUrls = s3Methods.getImages()
  .then((data) => {
    console.log(data);
    let photoData = [];
    for (let i = 0; i < 16; i++) {
      let fakeId = i;
      let fakeName = faker.commerce.productName();
      let photos = [data[i*3 + 1], data[i*3 + 2], data[i*3+3]];
      let photo = new Photo(fakeId, fakeName);
      photo.pictures = photos;
      photoData.push(photo);
    }
    db.insertMany(photoData)
    .then(() => {
      console.log('Data inserted')
    }).catch((err) => {
      console.log(err)
    })
  })
}

module.exports = createPhotoSchema