import React from 'react'
import NavBar from '../components/NavBar'
import AddDonorForm from '../components/AddDonorForm'
import FooterPage from '../components/FooterPage'
import "../styles/About.css"


const About = () => {
    return (
        <>
            <NavBar />
            <div className="about-container">
                <section className="about-section">
                    <h2>About Our Blood Donation Platform</h2>
                    <p>
                        Our platform connects voluntary blood donors with those in urgent need,
                        making the process of saving lives easier and faster.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Why Blood Donation Matters?</h2>
                    <p>Every two seconds, someone in the world needs blood.</p>
                    <p>
                        Donating blood not only saves lives but also improves the donor’s own
                        health by stimulating blood cell production.
                    </p>
                </section>


                <section className="about-section">
                    <h2>Our Mission & Vision</h2>
                    <p>
                        Our mission is to create an easy-to-use platform where those in need
                        can find blood donors quickly and efficiently.
                    </p>
                    <p>
                        We envision a world where no one has to struggle to find life-saving
                        blood in times of emergency.
                    </p>
                </section>

                <section className="about-section testimonial-section">
                    <h2>Real Stories, Real Impact</h2>
                    <blockquote>
                        "I found a donor within minutes when my father needed blood urgently.
                        This platform is a lifesaver!" – <strong>Nantha, Bangalore</strong>
                    </blockquote>
                </section>
            </div>
            <AddDonorForm />
            <FooterPage />
        </>
    );
};


export default About