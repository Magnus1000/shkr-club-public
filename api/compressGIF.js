const cors = require('cors')();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = (req, res) => {
  cors(req, res, async () => {
    try {
      const { url, width } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required in the request body' });
      }

      if (!width || isNaN(width)) {
        return res.status(400).json({ error: 'Valid width is required in the request body' });
      }

      const imageWidth = parseInt(width, 10);

      // Upload GIF to Cloudinary
      const result = await cloudinary.uploader.upload(url, { 
        resource_type: "image",
        transformation: [
          {width: imageWidth, crop: "scale"}
        ]
      });

      console.log('Uploaded and resized GIF:', result);

      // Get the public ID of the uploaded GIF
      const publicId = result.public_id;

      // Generate WebP URL with compression and specified width
      const webpUrl = cloudinary.url(publicId, {
        format: 'webp',
        quality: 'auto',
        width: imageWidth,
        crop: "scale"
      });

      console.log('WebP URL:', webpUrl);

      res.status(200).json({ webpUrl });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  });
};