import React from "react";
import classes from "./ResetModal.module.css";

const Modal = ({ closeModal, setResetCode, language }) => {
	return (
		<>
			<div className={classes.modal_wrapper}>
				<div className={classes.modal_container}>
					<div className={classes.modal_title}>
						<h2>Restore Default Code</h2>
					</div>
					<div className={classes.modal_body}>
						<p style={{ marginBottom: "20px" }}>
							{`Stop! You're about to reset your code. Any work that you've done
							on this code in ${language.toUpperCase()} will be lost.`}
						</p>
						<p>Are you sure that you want to continue?</p>
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
