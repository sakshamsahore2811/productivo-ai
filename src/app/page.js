'use client'
import Navbar from './components/Navbar/Navbar';
import Todo from './components/Todo/Todo';
import Timer from './components/Timer/Timer';
import CommunityApp from './components/CommunityApp/CommunityApp';
import Footer from './components/Footer/Footer';
import ContactUs from './components/ContactUs/ContactUs';
export default function Home() {
    return(
    <div>
           <Navbar/>
           <Timer/>
           <Todo/>
           {/* <CommunityApp/> */}
           <ContactUs/>
           <Footer/>
    </div>
    )
}