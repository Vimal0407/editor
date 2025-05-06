import { useContext } from "react";
import { Modal } from "../../Provider/Modals/Modal";
import "./index.scss";
import { RightComponent } from "./RightComponent";
import { modalconstants, ModalContext } from "../../Provider/ModalProvider";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";

export const HomeScreen = () => {
  const modalFeatures = useContext(ModalContext);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const openCreatePlaygroundModal = () => {
    modalFeatures.openModal(modalconstants.CREATE_PLAYGROUND);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Return to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="item-container">
          <img src="fixerlogo.jpg" alt="Fixer Logo" />
          <h1>Fixer Bot</h1>
          <h2>Code In Your Own Way</h2>

          <button onClick={openCreatePlaygroundModal}>
            <span className="material-icons">add</span>
            <span>Create File</span>
          </button>

          {user ? (
            <>
              <button onClick={() => navigate("/login")}>
                {user.displayName || user.email}
              </button>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Log In</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>
      </div>
      <RightComponent />
      <Modal />
    </div>
  );
};
