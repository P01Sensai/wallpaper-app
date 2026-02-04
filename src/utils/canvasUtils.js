

//Helping  to load an image safely 
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    //imp This allows us to edit images 
    image.setAttribute('crossOrigin', 'anonymous'); 
    image.src = url;
  });

// Takes the image + crop data and returns a new file
export default async function getCroppedImg(imageSrc, pixelCrop, blurAmount = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size to match the desired crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Apply Blur 
  // We multiply by 2 to make the effect more visible on high-res images
  if (blurAmount > 0) {
    ctx.filter = `blur(${blurAmount * 2}px)`; 
  }

  //Draw the cropped section onto the new canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  //Convert the canvas to a Blob and return it
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      // Give the file a name prop just in case
      blob.name = 'edited-wallpaper.jpg';
      resolve(blob);
    }, 'image/jpeg', 0.95); 
  });
}