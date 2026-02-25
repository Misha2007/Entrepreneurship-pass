import groupImage from '../assets/pictures/group2.png';
import '../style/home.css'




function Home() {

    console.log("Hello!")



    return (
    <div className="whatever">
        <div className="blacktab">
            <div className="whitetab">
                <span className="title">ETTEVÕTLIKKUSE PASS</span>
                <div className="buttons">
                    <button className="login">Logi sisse</button>
                    <button className="register">Registreeru</button>
                </div>
            </div>
        </div>

        <div className="image-wrapper">
            <img className="groupimg" src={groupImage} alt="Friendly picture" />
        </div>
    </div>  

    );

}


export default Home