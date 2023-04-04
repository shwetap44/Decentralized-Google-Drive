import {useEffect, useState} from 'react';
import "./Modal.css"

export default function Modal({setModalOpen, contract}) {

    const [revoked, setRevoke] = useState(false);

    const sharing = async() => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        console.log("shared");
        setModalOpen(false);
    }

    const revoke = async() =>{
        const address = document.querySelector("#selectNumber").value;
        await contract.notAllow(address);
        console.log("revoked");
        setRevoke(true);
        setModalOpen(false);
    }

    useEffect(() => {
        const accessList = async() => {
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = addressList;
            for(let i=0; i<options.length; i++){
                let opt = options[i].user;
                if(options[i].access == true) {
                    let e1 = document.createElement("option");
                    e1.textContent = opt;
                    e1.value = opt;
                    select.appendChild(e1);
                }
            }
            console.log("ran accressList");
        }
        contract && accessList();
    }, [])
  return (
    <div className='modalBackground'>
      <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
              <input type="text" className='address' placeholder='Enter Address'/>
          </div>
          <form id='myForm'>
              <select id='selectNumber'>
                  <option className='addressOptions'>People With Access</option>
              </select>
          </form>
          <div className="footer">
              <button onClick={()=> {setModalOpen(false)}} id="cancelBtn">Cancel</button>
              <button onClick={() => {sharing()}}>Share</button>
              <button onClick={() => {revoke()}}>Revoke</button>
          </div>
      </div>
    </div>
  );
}
