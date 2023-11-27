import React, { useState } from "react";
import classes from "./ResetModal.module.css";

const Modal = ({ closeModal, setResetCode }) => {
	return (
		<>
			<div className={classes.modal_wrapper}>
				<div className={classes.modal_container}>
					{/* <div className={classes.closeBtn} onClick={() => closeModal(false)}>
						<i className="fas fa-times"></i>
					</div> */}
					<div className={classes.modal_title}>
						<h2>Are you sure?</h2>
					</div>
					<div className={classes.modal_body}>
						Your current code will be discarded and reset to the default code..!
						{/* <select
							value={fontSize}
							onChange={(e) => {
								setFontSize(e.target.value);
							}}
						>
							<option value="14">14px</option>
							<option value="16">16px</option>
							<option value="18">18px</option>
							<option value="20">20px</option>
							<option value="22">22px</option>
						</select> */}
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
