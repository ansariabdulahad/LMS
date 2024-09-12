import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useSession } from "next-auth/react";
import s3 from "@/modules/aws";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useDispatch, useSelector } from "react-redux";
import { setUpload } from "@/redux/slices/upload.slice";

const { Dragger } = Upload;

const Uploader = () => {
    const dispatch = useDispatch();
    const uploadSlice = useSelector(state => state.uploadSlice);
    const { data: session } = useSession();

    // options for drag and drop upload functionality
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        customRequest: async ({ file, onProgress, onSuccess, onError }) => {
            const params = {
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
                Key: `${session && session.user.user_id}/${Date.now()}/${file.name}`,
                Body: file
            };

            try {
                await s3.send(new PutObjectCommand(params));
                message.success(`File Uploaded successfully`);
                dispatch(setUpload(uploadSlice + 1));
                onSuccess();
            } catch (error) {
                onError(error.message);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    )
}

export default Uploader;