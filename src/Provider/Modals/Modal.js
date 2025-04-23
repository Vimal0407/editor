import { useContext } from "react"
import { modalconstants, ModalContext } from "../ModalProvider"
import { CreatePlaygroundModal } from "./CreatePlaygrounModal";
import CreateFolderModal from "./CreateFolderModal";
import UpdateFolderTitleModal from "./UpdateFolderTitleModal";
import UpdateFileTitle from "./UpdateFileTitle";
import CreateCardModal from "./CreateCardModal";

export const Modal = () => {
    const modalFeatures = useContext(ModalContext);
    
    return ( <>
        {modalFeatures.activeModal === modalconstants.CREATE_PLAYGROUND && <CreatePlaygroundModal/>}
        {modalFeatures.activeModal === modalconstants.CREATE_FOLDER &&<CreateFolderModal/> }
        {modalFeatures.activeModal === modalconstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitleModal/>}
        {modalFeatures.activeModal === modalconstants.UPDATE_FILE_TITLE && <UpdateFileTitle/>}
        {modalFeatures.activeModal === modalconstants.CREATE_CARD && <CreateCardModal/> }
    </>
    );
}