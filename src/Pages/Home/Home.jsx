import React from 'react'
import "./Home.css"
import Footer from '../../Components/Footer/Footer'


const Home = () => {
  return (
    <div className='main-home'>
      <div className='container'>
        <h1>Hello, Admin</h1>
        <br />
        <p>If you are a admin you can create Project.
          <br />
           and assign the manager</p>
        <img src="https://plus.unsplash.com/premium_photo-1682096592504-5bc960bea6d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8" alt="" />
      </div>
      <div className='manager-container'>
        <h1>Hello, Manager</h1>
        <br />
        <p>If you are a Manager you can create Task.
          <br />
           and assign the member</p>
        <img src="https://plus.unsplash.com/premium_photo-1769788980599-712c11fb96b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D " alt="" />
      </div>
      <div className='mem-container'>
        <h1>Hello, Memeber</h1>
        <br />
        <p>If you are a Member you can Comment on the task.
          <br />
           and update the status</p>
        <img src="https://plus.unsplash.com/premium_photo-1661778490723-371305b4fb06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
      </div>
      <Footer/>
    </div>  
  )
}

export default Home