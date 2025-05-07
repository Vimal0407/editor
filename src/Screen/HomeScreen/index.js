import { useContext, useEffect } from "react";
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
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    // Redirect to login if not logged in
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const openCreatePlaygroundModal = () => {
    modalFeatures.openModal(modalconstants.CREATE_PLAYGROUND);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Go back to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <div>Loading...</div>; // Optional: Show a loader while auth state is being determined

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

          {/* Only show username and logout when logged in */}
          <button onClick={() => navigate("/login")}>
            {user?.displayName || user?.email}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <RightComponent />
      <Modal />
    </div>
  );
};
