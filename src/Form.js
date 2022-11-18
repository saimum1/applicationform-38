import React,{useState} from 'react'
import {Document,Page} from 'react-pdf/dist/esm/entry.webpack'

import './form.css'
import emailjs from 'emailjs-com';
import axios from 'axios';

const Form = () => {



const [name, setname] = useState("");
const [email, setemail] = useState("");
const [phone, setphone] = useState("");
const [url, seturl] = useState("");
const [pos, setpos] = useState("");
const [file, setfile] = useState([]);
const [pdf, setpdf] = useState([]);
const [pdfnum, setpdfnum] = useState(1);
const [pdfnumpage, setpdfnumpage] = useState('');

const [cat, setcat] = useState([]);

const [err, seterr] = useState(false);


const [open, setopen] = useState();

const emailContent={
    to_name:"SVGMarkerElement",
    from_name:name,
   
}

const sendmail=(e)=>{

    e.preventDefault();

    emailjs.sendForm('service_l3cve5c' , 'template_2w99s1q', emailContent ,'esKbKfm2iCCOE5NbL')
        .then((res)=>{
            console.log(res)
        })
        .catch((er)=>{
            console.log(er)
        })
  }



const handleSubmit =(e)=>{
        e.preventDefault();
        // const   user={
        //     name,email,phone,url,cat,file,pos
        // };
        // setdata(user);
           
    

    };



    const handleselecteddata=async (e)=>{
        let msg=[];

        if(name === '' || pdf === '' || email === '' || phone === '' || url === ''){
            msg.push("Field with * should be filled")
            console.log(name)
        }
    
        else if (msg.length>0){
            seterr(true);

           
        }

   else{

    e.preventDefault();
    const newPost={
        name:name,
        email:email,
        phone:phone,
        url:url,
        category:cat,
        files:file,
        position:pos,
    };
    console.log(newPost)
    if(file){
        const data =new FormData();
        const filename = Date.now() + file.name;
        data.append("name" , filename);
        data.append("files" , file);
        newPost.images=filename;


        await axios.post("https://samapiform.herokuapp.com/api/posts/image", data)
  
    };


    await axios.post("https://samapiform.herokuapp.com/api/posts",newPost);
    seterr(false)
    window.location.replace("/sc");
    sendmail(); 
  
      }};


    const handleimage=(e)=>{
        e.preventDefault();
        setfile(URL.createObjectURL(e.target.files[0]));
       
    };

    const handlepdf=(e)=>{
      
        setpdf((e.target.files[0]))
    };


    const onloadsuccess=({numPages})=>{
            setpdfnum(1);
            setpdfnumpage(numPages);
    }


    const handlechange=(e)=>{
        const value=e.target.value;
        const checked=e.target.checked;

        if(checked){
            setcat([
                ...cat,value
            ])
        }

        else{
            setcat(cat.filter((e)=>e !==value))
        }
    }
    

  return (<>
    <div  className={open ? "home close" : 'home'}>


                <section className='heading'>
                    <a href='' onClick={()=>alert("this feature is under development")}>Apply with Linkedin</a>
                  

                    {err && <span>All field with (*) should be filled</span>}
                </section>


                <section className='form_container'>
                    <div>
                    <h4>Apply for position</h4>
                    </div>
                 
                    <form className='form'   onSubmit={handleSubmit}>
                            <div className='form_field'>
                                
                                <div className='label_f'>
                                    <label htmlFor='name'>Name
                                    <span className='ast'>*</span>
                                    </label>
                                    </div>
                                
                                <div className='inputfield'>
                                <input   required type='text' name='name' placeholder='Type a valid full name' 
                              
                             
                                onChange={(e)=>setname(e.target.value)}></input>
                                </div>
                                

                            </div>

                          <div className='form_field'>
                                
                                <div className='label_f'>
                                    <label htmlFor='email'>Email<span>*</span></label>
                                    </div>
                                    <div className='inputfield'>
                                    <input required type='email' name='email' placeholder='Type a valid email' 
                                   
                                     onChange={e=>setemail(e.target.value)}></input>

                                    </div>
                                
                            </div>

                            <div className='form_field'>
                                
                                <div className='label_f'>
                                    <label htmlFor='phone'>Phone<span>*</span></label>
                                    </div>
                                    <div className='inputfield'>
                                    <input required type='text' name='phone' placeholder='Type a valid number eg: 018234845646' 
                                   
                                     onChange={(e)=>setphone(e.target.value)}></input>
                                    </div>
                              

                            </div>


                            <div className='form_field'>
                                
                                <div className='label_f'>
                                    <label htmlFor='url'>Linkedin<span>*</span></label>
                                    </div>
                                    <div className='inputfield'>
                                    <input required type='text' name='url' placeholder='Paste your valid Linkedin Profile' 
                                
                                     onChange={e=>seturl(e.target.value)}></input>
                                    </div>
                               

                            </div> 


                            <div className='form_field'>
                                
                                <div className='label_f'>
                                    <label htmlFor='pos'>Position<span>*</span></label>
                                    </div>
                                    <div className='inputfield'>
                                    <input required type='text' name='pos' placeholder='position' 
                                
                                     onChange={e=>setpos(e.target.value)}></input>
                                    </div>
                               

                            </div> 

                        <div className='label_for_skill'>
                        <label>Select your skills<span>*</span>(you have to select a minimum of one skill to submit)</label>
                        </div>
                      
                            <div className='checkboxdiv'>
                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' value='PHP'
                                onChange={handlechange}></input>
                                <label>PHP</label>
                                </div>

                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' value='Python'
                                 onChange={handlechange}></input>
                                <label>Python</label>
                                </div>

                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' value='SQL'
                                 onChange={handlechange}></input>
                                <label>SQL</label>
                                </div>
                              
                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' value='CSS'
                                 onChange={handlechange}></input>
                                <label>CSS</label>
                                </div>

                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' value='HTML'
                                 onChange={handlechange}></input>
                                <label>HTML5</label>
                                </div>

                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' value='JavaScript'
                                 onChange={handlechange}></input>
                                <label>JavaScript</label>
                                </div>

                                <div className='checkboxfield'>
                                <input type='checkbox' name='category' 
                                 value='React'
                                   onChange={handlechange}
                                  ></input>
                                <label>React</label>
                                </div>

                            </div>

                            <div className='checkboxfield'>
                            
                            <label>photo</label>
                            <input type='file'  onChange={handleimage}/>
                          

                            <label>CV (pdf format) </label>
                            <input required type='file'  onChange={handlepdf}/>


                                </div>

                               

                            <div className='button_s'>

                             {/* <Link to='/pop' >
                            <button type='submit' className='btn'> Preview</button>
                            </Link>  
                             */}

                         <button type='submit' className= 'btn' onClick={()=>setopen(!open)}> Preview</button> 
                         
                            
                          
                            <h5>All fiels marked with an asterisk (*) are mandatory.</h5>
                            <h6>After successfully applied you will be redirected to succefull page.</h6>
                            </div>
                           
                    </form>
                </section>
    </div>


<div className={open ? "popuphome open" : 'popuphome'}>

<div className='cancelbtn'>
           
            <i className="icon fa-solid fa-xmark" onClick={()=>setopen(!open)}></i>
          
        
        </div>
    <section className='form_sec'>
     
  
<form className='form_c' onSubmit={handleselecteddata}>
<span className='details'>View Details</span>
    <section className='firstsec'>
       
        <div className='leftdiv'>

            <div className='card_container'>
                {/* <img src='https://th.bing.com/th/id/R.1cfd276cdb6101d005212f6b17d21e10?rik=r4U%2be5jZ9XsW9Q&pid=ImgRaw&r=0'
                alt=''
                /> */}

<img src={file}
                alt=''
                />


                <span>{name}</span>
                <span>{pos}</span>
            </div>

        </div>


        <div className='rightdiv'>
            <div className='rightdivcontainer'>
            <span>selected Skills</span>
                    <div className='cardcont'>
                      
                        <ul>
                            {cat.map((e)=>{
                               return <li>{e}</li>
                              
                            })}
                       
                        </ul>
                    </div>
            </div>
        </div>


    </section>

    <span className='detailscv'>Uploaded CV</span>
    <section className='secondsec'>
        <div className='pdfcontainer'>
            <div className='pdfheading'>
                <span>Pdf view</span>
                <span>Html view</span>
            </div>
           <Document file={pdf} onloadsuccess={onloadsuccess} className="dcment">
            <Page height="400"
            width="400"
            className="pageview"
             pageNumber={pdfnum} ></Page>
           </Document>
        </div>
    </section>


    <button type='submit' className='btn2' onClick={()=>setopen(!open)}  > Submit</button> 
</form>
</section>

</div>
</>
  )
}

export default Form