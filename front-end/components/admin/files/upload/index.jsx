import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import AWS from "@/modules/aws";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const { Dragger } = Upload;
const s3 = new AWS.S3();

const Uploader = () => {
    const pathname = usePathname();
    const [dir, setDir] = useState(null);

    // options for drag and drop upload functionality
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        customRequest: async ({ file, onProgress, onSuccess, onError }) => {
            const uploader = s3.upload({
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
                Key: `${dir}/${file.name}`,
                Body: file
            });

            uploader.on('httpUploadProgress', ({ loaded, total }) => {
                const p = Math.round((loaded / total) * 100);
                onProgress({ percent: p });
            })

            try {
                const data = await uploader.promise();
                message.success(`File Uploaded in ${data.Key}`);
                onSuccess();
            } catch (error) {
                onError(error.message);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    useEffect(() => {
        if (pathname) {
            let tmp = pathname.split('/');
            let path = tmp.splice(3, tmp.length - 1).join('/');
            setDir(path);
        }
    }, [pathname]);

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