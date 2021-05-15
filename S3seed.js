require('dotenv').config();
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// const getImages = new Promise(function(resolve, reject){
//   s3.listObjects(params, function(err, data) {
//    if (err) {
//     return reject(err);
//    }

//    resolve(data.Contents);
//   });
//  });

const getImages = () => {
  let params = {
    Bucket: bucketName
  }
  console.log('hello');
  return s3.listObjectsV2(params).promise()
  .then((data) => {
    let imageUrls = data.Contents.map(((content) => {
      let url;
      url = `https://${bucketName}.s3.${region}.amazonaws.com/${content.Key}`
      console.log(url);
      return url;
    }))
    return imageUrls;
  })
  .catch((err) => {
    console.log('error')
  })
}

module.exports = {
  getImages
}
