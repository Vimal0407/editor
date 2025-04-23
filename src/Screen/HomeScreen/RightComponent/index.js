import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./index.scss";
import { PlaygroundContext } from "../../../Provider/PlaygroundProvider";
import { modalconstants, ModalContext } from "../../../Provider/ModalProvider";

const Folder = ({ folderTitle, cards, folderId }) => {
  const { deleteFolder, deleteFile } = useContext(PlaygroundContext);
  const { openModal, setModalPayload } = useContext(ModalContext);
  const navigate = useNavigate();

  const onDeleteFolder = () => {
    if (window.confirm("Delete this folder and all files inside?")) {
      deleteFolder(folderId);
    }
  };

  const onEditFolderTitle = () => {
    setModalPayload(folderId);
    openModal(modalconstants.UPDATE_FOLDER_TITLE);
  };

  const OpenCreateCardModal =() =>{
    setModalPayload(folderId)
    openModal(modalconstants.CREATE_CARD)
  }

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-header-item">
          <span className="material-icons">folder</span>
          <span>{folderTitle}</span>
        </div>
        <div className="folder-header-item">
          <span className="material-icons" onClick={onDeleteFolder}>
            delete
          </span>
          <span className="material-icons" onClick={onEditFolderTitle}>
            edit
          </span>
          <button onClick={OpenCreateCardModal}>
            <span className="material-icons">add</span>
            <span>New File</span>
          </button>
        </div>
      </div>

      <div className="cards-container">
        {cards?.map((file, index) => {
          const editFile = () => {
            setModalPayload({ fileId: file.id, folderId });
            openModal(modalconstants.UPDATE_FILE_TITLE);
          };

          const handleDeleteFile = () => {
            if (window.confirm(`Delete file "${file.title}"?`)) {
              deleteFile(folderId, file.id);
            }
          };
          return (
            <div className="card" key={index} onClick={() => navigate('/file')} >
              <img src="file.png" alt="file icon" />
              <div className="title-container">
                <span>{file?.title}</span>
                <span>Language: {file?.language}</span>
              </div>
              <div className="del-edit">
                <span className="material-icons" onClick={handleDeleteFile}>
                  delete
                </span>
                <span className="material-icons" onClick={editFile}>
                  edit
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RightComponent = () => {
  const { folders } = useContext(PlaygroundContext);
  const { openModal } = useContext(ModalContext);

  const openCreateNewFolderModal = () => {
    openModal(modalconstants.CREATE_FOLDER);
  };

  return (
    <div className="right-container">
      <div className="header">
        <h1 className="title">My Playground</h1>
        <button className="add-folder" onClick={openCreateNewFolderModal}>
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>
      {folders?.map((folder) => (
        <Folder
          key={folder.id}
          folderTitle={folder?.title}
          cards={folder?.files}
          folderId={folder.id}
        />
      ))}
    </div>
  );
};