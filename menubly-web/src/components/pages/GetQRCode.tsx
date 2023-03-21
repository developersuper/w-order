import React from "react";
import { DownloadIcon } from "assets/icons/Download";
import axios from "axios";
import H3 from "components/headings/H3";

const GetQRCode = ({qrCode, name}: any) => {
    const dowload = async () => {
        axios({
            url: qrCode,
            method: 'get',
            responseType: 'blob',
        }).then((response) => {
            const blob = new Blob([response.data], { type: 'image/png' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response?.headers['content-disposition'];
            let fileName = name;
            if (contentDisposition) {
                const fileNameMatch: any = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
            }
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }).catch(() => {
        });
    }
    return (
        <div className="text-center pt-6">
                
                <H3>QR Code of {name}</H3>
                <p className="body-default mt-2 mb-8">Download and print QR code for your customers.<br />
                    Explore different ways of using QR code <a href="https://www.menubly.com/blog/qr-code-table-tent/" rel="noreferrer" target="_blank">here</a>.</p>
                <div className="block mx-auto w-[158px] h-[158px]">
                    <img src={qrCode} alt={name} className="max-w-[158px] mx-auto" />
                </div>    
                
                <button type="button" className="bg-primary-light hover:bg-teal-70 mt-8 p-[14px] rounded-xl text-white text-sm" onClick={dowload}>
                    <span className="flex items-center">
                        <DownloadIcon /> <span className="ml-2.5 text-center">Download image<br /> <span className="text-white/0.7">PNG</span></span>
                    </span>
                </button>
            </div>
    )
}

export { GetQRCode}