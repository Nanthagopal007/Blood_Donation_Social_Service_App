import React from 'react'
import SideBar from './SideBar'
import ContactDetails from '../ContactDetails'
import "../../styles/ContactUs.css"

const ContactUs = () => {
  return (
    <div className="dashboard-container">
      <div className='sidebar'>
        <SideBar />
      </div>
      <div className="dashboard-content ">
        <ContactDetails />
      </div>
    </div>
  )
}

export default ContactUs