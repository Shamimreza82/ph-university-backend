import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs'

export const sendImageToCloudinary = async (imageName: string, path: string) => {
  // Configuration
  cloudinary.config({
    cloud_name: 'djr5gjijg',
    api_key: '784829438897149',
    api_secret: '183qwFjbw7FxbZvPPsNJCRHNETo', // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
        path,
      {
        public_id: imageName,
      },
    )
    .catch((error) => {
      console.log(error);
    });



//   console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
  });

//   console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url('shoes', {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });

//   console.log(autoCropUrl);
 return uploadResult


};


// const uploadDir = path.join(process.cwd(), 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), 'uploads'))
    },

    //todo file name when save local disk
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage })
