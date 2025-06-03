import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { mystore } from '../../store/myStore';

interface ImagePickProps {
  setImages: (files: File[]) => void;
}

export default function ImagePick({ setImages }: ImagePickProps) {
  const [images, setLocalImages] = React.useState([]);
  const maxNumber = 69;

  // Define the type of your store's state
  type MyStoreState = {
    updateimgdata: (data: unknown) => void;
    imgdata: unknown;
  };

  const updateimgdata = mystore((state: MyStoreState) => state.updateimgdata);
  const imgdata = mystore((state: MyStoreState) => state.imgdata);

  const onChange = (imageList: ImageListType) => {
    // data for submit
    // console.log(imageList[0], addUpdateIndex);
    console.log('here');
    // console.log(imageList[0].file)
    // console.log(imageList.length)

    imageList.forEach((element) => {
      [].push(element.file);
    });
    updateimgdata([]);
    console.log(imgdata);
    setLocalImages(imageList as never[]);
    // Extract File objects and pass to parent
    const files = imageList.map((img) => img.file).filter(Boolean) as File[];
    setImages(files);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <div className="m-4"> Click or Drop here</div>
            </button>

            <button onClick={onImageRemoveAll}>Remove all images</button>
            <div className="flex flex-row flex-wrap gap-10">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.dataURL} alt="" width="200" height={200} />
                  <div className="image-item__btn-wrapper">
                    <button
                      className=" border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      className="  border-2 border-gray-30 rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
