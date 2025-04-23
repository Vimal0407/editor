import { useContext } from "react";
import "./createPlaygroundModal.scss";
import { ModalContext } from "../ModalProvider";
import { v4 } from "uuid";
import { defaultCodes, PlaygroundContext } from "../PlaygroundProvider";

export const CreateCardModal = () => {
  const { closeModal, modalPayload } = useContext(ModalContext);
  const { createPlayground } = useContext(PlaygroundContext);

  const onSubmitModal = (e) => {
    e.preventDefault();

    const fileName = e.target.fileName.value;
    const language = e.target.language.value;

    const file = {
      id: v4(),
      title: fileName,
      language,
      code: defaultCodes[language.toLowerCase()],
    };

    createPlayground(modalPayload, file);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span onClick={closeModal} className="material-icons close">close</span>
        <h1>Create New File</h1>
        <div className="item">
          <p>Enter File Name</p>
          <input name="fileName" placeholder="Enter File Name" required />
        </div>
        <div className="item">
          <select name="language">
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <button type="submit">Create File</button>
      </form>
    </div>
  );
};

export default CreateCardModal;
