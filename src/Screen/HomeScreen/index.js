import { useContext } from "react";
import { Modal } from "../../Provider/Modals/Modal";
import "./index.scss"
import { RightComponent } from "./RightComponent";
import { modalconstants, ModalContext } from "../../Provider/ModalProvider";
import { useNavigate } from "react-router-dom";


export const HomeScreen = () => {
    const modalFeatures = useContext(ModalContext);
    const navigate = useNavigate();

    const openCreatePlaygroundModal = () => {
        modalFeatures.openModal( modalconstants.CREATE_PLAYGROUND );
    };
    return (
        <div className="home-container">
            <div className="left-container">
                <div className="item-container">
                    <img src="fixerlogo.jpg" alt="" />
                    <h1>Fixer Bot</h1>
                    <h2>Code In Your Own way</h2>
                    <button  onClick={openCreatePlaygroundModal}>
                        <span className="material-icons">add</span>
                        <span>Create File</span>
                    </button> 
                    <button onClick={() => navigate("/login")}>Log In</button>
                    <button onClick={() => navigate("./signup")}>Sign Up</button>
                </div>
            </div>
            <RightComponent />
            <Modal />
        </div>
    )
}