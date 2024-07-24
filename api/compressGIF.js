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
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'URL is required in the request body' });
      }

      // Upload GIF to Cloudinary
      const result = await cloudinary.uploader.upload(url, { 
        resource_type: "image",
        transformation: [
          {width: 480, crop: "scale"}
        ]
      });

      console.log('Uploaded and resized GIF:', result);

      // Get the public ID of the uploaded GIF
      const publicId = result.public_id;

      // Generate WebP URL with compression and 480px width
      const webpUrl = cloudinary.url(publicId, {
        format: 'webp',
        quality: 'auto',
        width: 480,
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