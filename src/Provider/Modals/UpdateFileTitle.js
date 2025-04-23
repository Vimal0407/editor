import { useContext } from "react";
import "./createPlaygroundModal.scss";
import "./CreateFolderModal.scss";
import { ModalContext } from "../ModalProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

const UpdateFileTitle = () => {
    const { closeModal, modalPayload } = useContext(ModalContext);
    const { editFileTitle } = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value; 
        editFileTitle(fileName, modalPayload.folderId, modalPayload.fileId);
        closeModal(); // optional: close modal after submission
    };

    return (
        <div className="modal-container">
            <form className="modal-body" onSubmit={onSubmitModal}>
                <span onClick={closeModal} className="material-icons close">close</span>
                <h1>Update File Title</h1>
                <div className="input-container">  
                    <input 
                        required 
                        name="fileName" // fixed name
                        className="input-bar" 
                        placeholder="Enter New File Name" 
                    />
                    <button className="btn" type="submit">Edit File</button> {/* fixed button label */}
                </div>
            </form>
        </div>
    );
};

export default UpdateFileTitle;
