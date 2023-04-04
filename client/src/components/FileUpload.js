import {useState} from 'react';
import axios from 'axios';
import './FileUpload.css';

export default function FileUpload({account, provider, contract}) {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYTk1ZDA3OC03NTA3LTRkYTUtYjJlZC1iM2ZhMjRhMzQzYWEiLCJlbWFpbCI6InBhcmFuamFwZS5zaHdldGExOTk3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyNjA1ZDFhMTUxNThiNjQxOTM5YSIsInNjb3BlZEtleVNlY3JldCI6IjFiODA4OGU0N2JhZGYyMWVkZWNlYWRkNmFkMzY2YTk2MTk1NjA1ZTQ1NzkzZjBhMGRmMzNjZjgyMTJlZDc5ZmIiLCJpYXQiOjE2ODAzNjE5NDB9.7KLywh55MiVjUrrtXuWf0zcYnmO78Tv2MRu-TVUBrqM'

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(file){
            try{
                const formData = new FormData();
                formData.append("file",file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    maxContentLength: -1,
                    headers: {
                      "Content-Type": `multipart/form-data`,
                      'pinata_api_key': `2605d1a15158b641939a`,
                      'pinata_secret_api_key': `1b8088e47badf21edeceadd6ad366a96195605e45793f0a0df33cf8212ed79fb`,
                      "Authorization": JWT
                    },
                  });

            const imagHash =`ipfs://${resFile.data.IpfsHash}`;
            contract.add(account, imagHash);

            alert("File uploaded successfully.");
            setFileName("No image selected");
            setFile(null);

            }catch(e){
                alert("unable to upload image to pinata")
            }
        }
    }

    const retrieveFile = async(e) => {
        const data = e.target.files[0]; //array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () =>{
            setFile(data);
        }
        setFileName(data.name);
        e.preventDefault();
    }
  return (
    <div className='top'>
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor='file-upload' className='choose'>
            Choose Image
            </label>
            <input disabled={!account} type="file" id="file-upload" 
                    name="data" onChange={retrieveFile}></input>
            <span className='textArea'>Image: {fileName}</span>
            <button disabled={!file} type='submit' className='upload'>Upload File</button>
        </form>
    </div>
  );
}
