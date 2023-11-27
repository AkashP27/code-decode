import React from "react";
import classes from "./ResetModal.module.css";

const Modal = ({ closeModal, setResetCode }) => {
	return (
		<>
			<div className={classes.modal_wrapper}>
				<div className={classes.modal_container}>
					<div className={classes.modal_title}>
						<h2>Are you sure?</h2>
					</div>
					<div className={classes.modal_body}>
						Your current code will be discarded and reset to the default code..!
					</div>
					<div className={classes.modal_footer}>
						<button id={classes.cancelBtn} onClick={() => closeModal(false)}>
							Cancel
						</button>
						<button
							onClick={() => {
								setResetCode();
								closeModal(false);
							}}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
