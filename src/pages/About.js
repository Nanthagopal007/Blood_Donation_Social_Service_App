import NavBar from '../components/ClientPage/common/NavBar'
import AddDonorForm from '../components/ClientPage/about/AddDonorForm'
import FooterPage from '../components/ClientPage/common/FooterPage'
import AboutContents from '../components/ClientPage/about/AboutContents';


const About = () => {
    return (
        <>
            <NavBar />
            <AboutContents/>
            <AddDonorForm />
            <FooterPage />
        </>
    );
};


export default About