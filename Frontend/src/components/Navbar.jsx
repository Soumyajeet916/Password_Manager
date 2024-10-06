const Navbar = () => {
  return (
    <>
    <nav className='bg-slate-900 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 h-24 py-5'> 

        <div className='logo  font-bold text-purple-300 p-4 text-4xl'>
          <span className ='text-purple-600'> &lt; SD_ </span>
          <span>PASSKEY</span>
          <span className ='text-purple-600'>/ &gt; </span>
        </div>

         <a href="https://github.com/Soumyajeet916/Password_Manager">
         <button className='text-white bg-purple-200 my-5 rounded-md flex justify-between items-center' >
                        <img className=' p-1 w-10' src='/src/assets/icons/github.gif' alt='github'/>
                        <span className="font-bold px-2 text-black">Github</span>
                    </button></a>
      </div>
    </nav>
  </>)
}
export default Navbar 