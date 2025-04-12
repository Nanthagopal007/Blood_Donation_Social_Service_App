import React from 'react'
import NavBar from '../components/NavBar'
import DonorList from '../components/DonorList'
import FooterPage from '../components/FooterPage'

const Home = () => {
    return (
        <div style={{ minHeight: "100vh", overflowY: "auto" }}>
            <NavBar />
            <DonorList />
            <FooterPage />
        </div>
    )
}

export default Home