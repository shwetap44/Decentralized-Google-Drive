import {useState} from 'react';
import "./Display.css"

export default function Display({contract, account}) {

    const [data, setData] = useState("");

    const getData = async()=>{
        let dataArray;
        try{
            const otherAddress = document.querySelector(".address").value;
            if(otherAddress){
                dataArray = await contract.displayImages(otherAddress);
                console.log(dataArray);
            }else{
                dataArray = await contract.displayImages(account);
            }
        }catch(e){
            alert("You don't have access");
        }
        
        const isEmpty = Object.keys(dataArray).length === 0;

        if(!isEmpty){
            const str = dataArray.toString();
            const str_array = str.split(",");
            // console.log(str);
            // console.log(str_array);
            const images = str_array.map((item,i) => {
                return(
                    <a href={item} key={i} target="_blank">
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}></img>
                    </a>
                )
            })
            setData(images);
        }else {
            alert("No image to display")
        }
    }
  return (
    <>
    <div className='image-list'>{data}</div>
    <input type="text" placeholder="Enter Adress" className="address"></input>
    <button className='center button' onClick={getData}>Get Data</button>
    </>
  );
}
