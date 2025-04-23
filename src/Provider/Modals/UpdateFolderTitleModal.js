import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import "./createPlaygroundModal.scss"
import "./CreateFolderModal.scss"
import { PlaygroundContext } from "../PlaygroundProvider";

const UpdateFolderTitleModal = () => {

    const {closeModal, modalPayload} = useContext(ModalContext);
    const {editFolderTitle} = useContext(PlaygroundContext)

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        editFolderTitle(folderName, modalPayload);
        closeModal();
    }
    
    return (
        <div className="modal-container">
            <form className="modal-body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-icons close" >close</span>
                <h1>Update Folder Title</h1>
                <div className="input-container">  
                    <input required name="folderName" className="input-bar" placeholder="Enter New Folder  Name"/>
                    <button  className="btn" type='submit'>Edit Folder</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateFolderTitleModal;
