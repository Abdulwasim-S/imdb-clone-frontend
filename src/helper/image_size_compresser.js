const image_size_compress = (file, setState) => {
  if (file) {
    const reader = new FileReader();

    // Convert the image file to a data URL
    reader.readAsDataURL(file);

    reader.onloadend = async (event) => {
      // The result property contains the data as a data URL
      let image_url = event.target.result;
      let image = document.createElement("img");
      image.src = image_url;

      image.onload = async () => {
        let canvas = await document.createElement("canvas");
        [canvas.width, canvas.height] = [720, 640];

        let contex = await canvas.getContext("2d");
        contex.drawImage(image, 0, 0, canvas.width, canvas.height);

        let compressed_image_url = await contex.canvas.toDataURL(
          "image/jpeg",
          90
        );
        setState(compressed_image_url);
      };
    };
  }
};

export default image_size_compress;
