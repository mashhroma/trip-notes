import { ChangeEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import LoaderIcon from "../LoaderIcon";
import style from "./UploadButton.module.scss";
import { getFileSizeString } from "@/utils/functions/getFileSizeString";

interface UploadButtonProps {
	loadingFile: boolean;
	isFileUploaded: boolean;
	fileName: string;
	errorUpload: boolean;
	removeFile: () => void;
	getFile: (file: File) => void;
	fileType?: string;
	colorButtonLabel?: string;
	secondButtonLabel?: string;
}

const UploadButton = ({
	loadingFile,
	isFileUploaded,
	fileName,
	errorUpload,
	removeFile,
	getFile,
	fileType,
	colorButtonLabel,
	secondButtonLabel,
}: UploadButtonProps) => {
	const [fileSize, setFileSize] = useState<string>("");
	const [dragActive, setDragActive] = useState(false);

	const dragStartHandler = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setDragActive(true);
	};

	const dragLeaveHandler = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		setDragActive(false);
	};

	const dragDropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
		e.preventDefault();
		const files = Array.from(e.dataTransfer.files);
		if (files) {
			const extension = files[0].name.split(".")[1];
			const acceptType = fileType && fileType.includes(extension);
			if (acceptType) {
				getFile(files[0]);
				setFileSize(getFileSizeString(files[0].size));
			}
		}
		setDragActive(false);
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			getFile(event.target.files[0]);
			setFileSize(getFileSizeString(event.target.files[0].size));
		}
		event.target.value = "";
	};

	const getStatus = () => {
		if (fileName && !loadingFile && !isFileUploaded) {
			return (
				<div className={style.warningBlock}>
					<FaRegFile />
				</div>
			);
		}
		if (fileName && loadingFile && !isFileUploaded) {
			return <LoaderIcon />;
		}
		if (fileName && !loadingFile && isFileUploaded) {
			return (
				<div className={style.done}>
					<FaCheck />
				</div>
			);
		}
		if (errorUpload) {
			return (
				<div className={style.error}>
					<RiErrorWarningLine />
				</div>
			);
		}
	};

	const disableBtn = () => {
		if (fileName && loadingFile && !errorUpload) {
			return true;
		} else if (errorUpload) {
			return true;
		} else return false;
	};

	const fileTypeLabel = () => {
		if (fileType?.includes("tif")) {
			return "Файл TIF";
		} else if (fileType?.includes("json")) {
			return "Файл JSON";
		} else return null;
	};

	return (
		<div className={style.uploadBlock}>
			<label
				htmlFor="fileInput"
				className={style.uploadLabel}
				style={{
					background: dragActive ? "#e6eafb" : "#fff",
				}}
				onDragStart={dragStartHandler}
				onDragLeave={dragLeaveHandler}
				onDragOver={dragStartHandler}
				onDrop={dragDropHandler}
			>
				<div className={style.buttonLabel}>
					<span>{colorButtonLabel || ""}</span> {secondButtonLabel || ""}
				</div>
				<input
					type="file"
					id="fileInput"
					onChange={handleFileChange}
					className={style.uploadInput}
					accept={fileType}
					disabled={disableBtn()}
				/>
			</label>

			<div className={style.fileTypes}>{fileTypeLabel()}</div>

			{fileName && (
				<div className={style.infoBlock}>
					<div className={style.warningBlock}>{getStatus()}</div>
					<div className={style.fileNameBlock}>
						{fileName} <span className={style.fileSize}>{fileSize}</span>
						{errorUpload && (
							<div className={style.errorMessage}>Произошла ошибка</div>
						)}
					</div>
					{!loadingFile && (
						<div className={style.remove} onClick={removeFile}>
							<IoMdClose size={16} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default UploadButton;
