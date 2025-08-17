import NavBar from '../components/ClientPage/common/NavBar.js'
import DonorList from '../components/ClientPage/home/DonorList.js'
import FooterPage from '../components/ClientPage/common/FooterPage.js'

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