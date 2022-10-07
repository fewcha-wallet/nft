import React, { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#333",
    color: "white",
  },
};
interface Active {
  active: boolean;
}

const Popup: React.FC<Active> = ({ active = false }) => {
  const [modalIsOpen, setIsOpen] = React.useState(active);
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    setIsOpen(active);
  },[active])

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Select Wallet"
        >
          <button onClick={closeModal}>X</button>
        </Modal>
      </div>
    </div>
  );
};

export default Popup;
