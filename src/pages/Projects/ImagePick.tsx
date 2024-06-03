import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { mystore } from "../../store/myStore";

export default function ImagePick() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const updateimgdata = mystore((state) => state.updateimgdata)
  const imgdata = mystore((state) => state.imgdata)

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    // console.log(imageList[0], addUpdateIndex);
    console.log("here")
    // console.log(imageList[0].file)
    // console.log(imageList.length)

    let arr: any = [];

    imageList.forEach(element => {
      arr.push(element.file)
    });
    updateimgdata(arr)
    console.log(imgdata)
    setImages(imageList as never[]);
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
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
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
                    <button className=" border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300" onClick={() => onImageUpdate(index)}>Update</button>
                    <button className="  border-2 border-gray-30 rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300" onClick={() => onImageRemove(index)}>Remove</button>
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
