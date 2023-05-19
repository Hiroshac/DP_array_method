import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

export const Ticket = () => {
    const param = useParams();
    const tid = param.id;
    const navi = useNavigate();

    const [Tid,setTid] = useState('');
    const [tDescription,setTDescription] = useState('');
    const [tAmount,setTAmount] = useState('');
    const [status,setStatus] = useState("");
    const [remark,setRemark] = useState('');
    const [pname,setPname] = useState('');
    const [pprice,setPprice] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [adata,setAdata] = useState([]);
    const [errors1,setError1] = useState("");
    const [errors2,setError2] = useState("");
    const [errors3,setError3] = useState("");
    const [errors4,setError4] = useState("");
    const [errors5,setError5] = useState("");
    const [errors6,setError6] = useState("");
    const [update,setUpdate] = useState("");
    const [pid,setPid] = useState("");

    const Submit = (e) => {

        e.preventDefault();

        const data = {
            TicketID : tid,
            TDscription : tDescription,
            Amount : totalPrice,
            Active : status,
            Remark : remark          
        }

        if(adata.length >= 1){
            if(totalPrice > 0){
                if(status != ""){
                    axios.post("http://localhost:5000/ticket/add", data).then((res) => {
                        navi("/");
                    });
                }else{
                    setError3("Select of above one");
                }
            }else{
                setError1("need to amount more than 0");
            }
        }else{
            setError2("need products");
        }
	};


    // product add 
    const AddSubmit = (e) => {

        if(update == "update"){
            const newdata = {
                PName : pname,
                 PPrice : pprice,
                 TID : tid
            }
             axios
                 .put(`http://localhost:5000/product/update/${pid}`,newdata )
                 .then((res) => {
                    window.location.reload(false);
                 }).catch(error => {
                     alert("error==="+error);
                 });
         }else{
             e.preventDefault();
     
             const pdata = {
                 PName : pname,
                 PPrice : pprice,
                 TID : tid
             }
             if(pname != ""){
                 if(pprice != ""){
                     if(pprice > 0){
                         axios.post("http://localhost:5000/product/add", pdata).then((res) => {
                            console.log(pname);
                            // window.location.reload(false);
                        })
                     }else{
                         setError6("Invalid Product Price");
                     }
                 }else{
                     setError5("Enter Product Price")
                 }
             }else{
                 setError4("Enter Product Name");
             }
         }
    }
    //get by id

    useEffect(()=>{
        GetByTID();
    },[])

    const GetByTID = () => {
        axios.post("http://localhost:5000/product/getid",{TID : tid}).then((res)=> {
            setAdata(res.data);
            console.log(res.data.length);
                 let totalPrice = 0;
                res.data.forEach((document) => {
                const price = Number(document.PPrice);
                totalPrice += price;
                });
                setTotalPrice(totalPrice);
        })
    }

    //clear
    const Clear = () => {
        setPname("");
        setPprice("");
    }
  
//Product Delete
const PDelete = (id) => {
    axios.delete(`http://localhost:5000/product/delete/${id}`);
    window.location.reload(false);
}

//getbyid
const GetProduct = (id) =>{
    axios.get(`http://localhost:5000/product/get/${id}`).then((res)=>{
        setPname(res.data.PName);
        setPprice(res.data.PPrice);
        setPid(id);
        console.log(id);
        setUpdate("update");
    })
}

  console.log(totalPrice);

  return (
    <div>
        <div className='mt-4 border border-4 p-4 container rounded' style={{width:'70%',marginLeft:"15%"}}>
            <form>
                <div class="row">
                    <div class="col">
                        {/* id  */}
                        <leble>TicketID</leble>
                        <input type="text" 
                                class="form-control" 
                                aria-label="Last name" 
                                disabled
                                value={tid}
                                name={tid}/>                
                    </div>
                    {/* tdescription  */}
                    <div class="col">
                        <leble>Ticket Dscription</leble>
                        <input type="text" 
                                class="form-control" 
                                aria-label="Last name" 
                                required
                                value={tDescription}
                                name={tDescription}
                                onChange={(e) => setTDescription(e.target.value)}/>
                    </div>
                </div>
                {/* amount  */}
                <div className='row mt-2'>
                    <leble>Amount</leble>
                    <input type="text" 
                                class="form-control" 
                                aria-label="Last name" 
                                style={{width:"48%",marginLeft:"1%"}}
                                disabled
                                value={Number(totalPrice).toFixed(2)}
                                name={totalPrice}
                                onChange={(e) => setTAmount(e.target.value)}/>           
                </div>
                <h7 className='text-danger'>{errors1}</h7>
                {/* product form  */}
                <form className='border border-4 p-4 mt-4 rounded ' style={{width:"80%",marginLeft:"10%"}}>
                    <div className='row mt-2 mt-2'>
                        <div class="col">
                            {/* product name  */}
                            <leble>Product Name</leble>
                            <input type="text" 
                                    class="form-control" 
                                    aria-label="Last name" 
                                    required
                                    value={pname}
                                    name={pname}
                                    onChange={(e) => setPname(e.target.value)}/>
                                <h7 className='text-danger'>{errors4}</h7>
                        </div>   
                        <div class="col">
                            {/* product price  */}
                            <leble>Product Price</leble>
                            <input type="text" 
                                    class="form-control" 
                                    aria-label="Last name" 
                                    required
                                    value={pprice}
                                    name={pprice}
                                    onChange={(e) => setPprice(e.target.value)}/>
                                 <h7 className='text-danger'>{errors5}</h7>
                                 <h7 className='text-danger'>{errors6}</h7>
                        </div>     
                    </div>
                        <div className='mt-3 container'>
                            <button type="button" class="btn btn-info" style={{width:"30%"}} onClick={AddSubmit}>Add</button>
                            <button type="button" class="btn bg-danger" style={{width:"30%",marginLeft:"15%"}} onClick={Clear}>Clear</button>
                        </div>
                </form>

                <div>
                <table class="table border border-4 rounded mt-4" style={{width:"70%",marginLeft:"15%"}} >
                    <thead>
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adata.map(m =>{
                            return(
                            <tr>
                                <th scope="row">
                                   <button type="button" class="btn" onClick={()=>{PDelete(m._id)}} style={{width:"30%"}}>
                                        <DeleteIcon />
                                    </button>
                                    <button type="button" class="btn" onClick={()=>{GetProduct(m._id)}} style={{width:"30%"}}>
                                        <ThreeSixtyIcon />
                                    </button>
                                   {/* <button type="button" class="btn btn-info" onClick={PDelete} style={{width:"50%"}}>Update</button> */}
                                </th>
                                <th scope="row">{m.PName}</th>
                                <td>{Number(m.PPrice).toFixed(2)}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                 </table>
                 <h7 className='text-danger'>{errors2}</h7>
                </div>
                {/* status  */}
                <div className='row mt-5 border border-4 p-4 rounded'>
                    <div class="form-check col">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="Active"
                            onChange={(e) => setStatus(e.target.value)}
                            />
                            <label class="form-check-label" for="exampleRadios1">
                                Active
                            </label>
                    </div>
                    <div class="form-check col">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="InActive"
                            onChange={(e) => setStatus(e.target.value)}
                            />
                            <label class="form-check-label" for="exampleRadios1">
                                InActive
                            </label>
                    </div>
                    <h7 className='text-danger'>{errors3}</h7>
                </div>
                {/* remark  */}
                <div className='row mt-4'>
                    <leble>Remark</leble>
                    <textarea type="text" 
                                class="form-control" 
                                aria-label="Last name" 
                                value={remark}
                                name={remark}
                                onChange={(e) => setRemark(e.target.value)}/>            
                </div>
                <div className='row mt-4'>
                    <button type="button" class="btn btn-info" onClick={Submit} style={{width:"40%",marginLeft:"30%"}}>Add New Tickets</button>
                </div>
            </form>
        </div>
    </div>
  )
}
