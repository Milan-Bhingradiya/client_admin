import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { v4 as generateId } from 'uuid';

function M() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);


const handleSubmit = async (e, projectname) => {
  e.preventDefault();
console.log("e.target")
console.log(e.target)
console.log("e.target.files")
console.log(e.target[0].files)
  const files = e.target.files; // Access all selected files

  // if (!files.length) {
  //   return; // No files selected, handle the case
  // }

};

  return (
    <div className="App">
      <form onSubmit={(e) => { handleSubmit(e, "milan") }} className='form'>
        <div>mi</div>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
    </div>
  );
}
export default M;