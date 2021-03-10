const multer = require('multer')

const path = require('path')

const crypto = require('crypto')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes = {

    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname,  "uploads"))
        },
        location: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
       
                cb(null, file.key)
            })
        },
       }),
       s3: multerS3({
           s3: new aws.S3({
               accessKeyId: 'AKIA6IUJH7V5BXFVON6X',
               secretAccessKey: '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',
               region: 'us-east-1'
           }),
           bucket: 'jurere', // pode colocar em variavel ambiente
           contentType: multerS3.AUTO_CONTENT_TYPE,
           acl: 'public-read',
           key: (req,file,cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
       
                cb(null, fileName)
            })
           }
       })
    }
    
    
    module.exports = {
    dest: path.resolve(__dirname, 'uploads'),
    storage: storageTypes['s3'],
    
    
    limits: {
        fileSize: 8 * 1024 * 1024
    },
    
    
    }