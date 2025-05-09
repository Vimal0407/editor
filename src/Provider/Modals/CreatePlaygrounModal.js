import { useContext } from "react"
import "./createPlaygroundModal.scss"
import { ModalContext } from "../ModalProvider"
import { PlaygroundContext } from "../PlaygroundProvider";

export const CreatePlaygroundModal = () => {
    const modalFeatures = useContext(ModalContext);
    const playgroundFeatures = useContext(PlaygroundContext)

    const closeModal = () => {
        modalFeatures.closeModal()
    };
    const onSubmitModal=(e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        const fileName = e.target.fileName.value;
        const language = e.target.language.value
        playgroundFeatures.createNewPlayground( {
            folderName,
            fileName,
            language

    })
        closeModal();
    }

    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close" >close</span>
            <h1>Create New Folder And File</h1>
            <div className="item">
                <p>Enter Folder Name</p>
                <input  name="folderName" required/>
            </div>
            <div className="item">
                <p>Enter File Name</p>
                <input name="fileName" required/>
            </div>
            <div className="item">
                <select name="language">
                   <option value="cpp">CPP</option>
                   <option value="java">Java</option>
                   <option value="javascript">Javascript</option>
                   <option value="python" >Python</option>
                </select>

                <button type="submit">
                    Create Folder
                </button>
            </div>
        </form>
    </div>
}