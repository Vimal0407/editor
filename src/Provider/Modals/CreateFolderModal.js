import { ModalContext } from "../ModalProvider.js";
import { PlaygroundContext } from "../PlaygroundProvider.js";
import "./CreateFolderModal.scss"
import "./createPlaygroundModal.scss"
import { useContext } from "react";

export const CreateFolderModal = () => {
    const modalFeatures = useContext (ModalContext);
    const { createNewFolder} = useContext(PlaygroundContext )
    const closeModal = () => {
        modalFeatures.closeModal();
    };

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        createNewFolder(folderName);
        closeModal();
    };
    

    return (
       <div className="modal-container">
            <form className="modal-body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-icons close">close</span>
                <h1>Create New Folder</h1>
                <div className="input-container">  
                    <input name="folderName" className="input-bar" placeholder="Enter folder Name"/>
                    <button  className="btn" type='submit'>Create Folder</button>
                </div>
            </form>
       </div>
    );
}

export default CreateFolderModal;
