import React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    
    const getPasswords = async () => {
        let req = fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
            setPasswordArray(passwords)
        }
    
    
    useEffect(() => {
        getPasswords()

    }, [])



    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }




    const showPassword = () => {
        alert("show the password");
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/icons/eyecross.svg")) {
            ref.current.src = "/icons/eye.svg"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "/icons/eyecross.svg"
        }
    }



    const savePassword = async () => {
        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        let res = await fetch("http://localhost:3000/",{method: "POST",headers:{"Content_Type":"application/json"},body: JSON.stringify({...form,id:uuidv4()})})
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({site: "", username: "", password: ""})
         toast('Password saved!', {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "dark",
         });
        }
        else{
            toast('Error:Password not saved')
            alert("Error: Password not saved");
        }
        
    }


    const deletePassword = async (id)  => {
        console.log("Deleting password with id:", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
           localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
           let res = await fetch("http://localhost:3000/",{method: "DELETE",headers:{"Content_Type":"application/json"},body: JSON.stringify({...form,id})})
             toast('Password deleted!', {
                 position: "top-right",
                 autoClose: 5000,
                hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "dark",
             });
        }

    }




    const editPassword = (id) => {
        console.log("Editing password with id:", id)
        setform(passwordArray.filter(i => i.id === id)[0])

        setPasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    }





    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-purple-200"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-purple-400 opacity-50 blur-[80px]"></div></div>
            <div className="p-2 md:p-10 md:mycontainer min-h-[90vh] bg-purple-100">

           <h1 className='text-2xl text font-bold text-center p-4'>
                <span className ='text-purple-500'> &lt; SD_ </span>
                <span className ='text-purple-800'>PASSKEY / &gt; </span>
                </h1>
                <p className='text-purple-700 font-bold flex justify-center'>Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-6 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-purple-500 w-full p-4 py-1' type='text' name='site' id='site' />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-purple-500 w-full p-4 py-1' type='text' name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-purple-500 w-full p-4 py-1' type='password' name='password' id='password' />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src='/src/assets/icons/eye.svg' alt='eye' />
                            </span>

                        </div>


                    </div>
                    <button onClick={savePassword} className=' flex justify-center items-center gap-2 bg-purple-400 hover:bg-purple-300 rounded-full px-8 py-2 w-fit border-2 border-purple-700'>
                    { /// add pic
                         <img src="/icons/add.gif" alt="add icon" height='25px' width='25px'></img>
                       }
                        Save </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 flex justify-center ' >Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='flex justify-center'>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-5">
                        <thead className='bg-purple-800 text-white'>
                            <tr>
                                <th className="border border-white py-2">Site</th>
                                <th className="border border-white py-2">Username</th>
                                <th className="border border-white py-2">Password</th>
                                <th className="border border-white py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-purple-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=" border border-white py-2 text-center">
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>



                                    </td>
                                    <td className=" border border-white py-2 text-center">
                                        <div className='flex items-center justify-center'><span>{item.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=" border border-white py-2 text-center w-32">
                                        <div className='flex items-center justify-center'><span>{item.password}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="justify-center border border-white py-2 text-center w-32">
                                        <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    
    )
}

export default Manager