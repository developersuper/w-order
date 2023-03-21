import React, { FC, useState } from "react";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import H3 from "components/headings/H3";
import { PlaceResponseType } from "types/Place.type";
import { QQCodeIcon } from "assets/icons/QRCode";
import { LinkIcon } from "assets/icons/Link";
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import { CopyIcon } from "assets/icons/Copy";
import { ShareIcon } from "assets/icons/Share";
import customToast from "components/Toast/ToastSuccess";
import Modal from "components/modal";
import { DeleteIcon } from "assets/icons/Delete";
import { useNavigate } from "react-router-dom";
import {GetQRCode} from "components/pages";

const PlaceCard: React.FC<PlaceResponseType> = ({ id, name, url, qrCode, createdDate, shortUrl, menuItemCount, categoryCount }: PlaceResponseType) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return <div className="p-6 rounded-xl bg-white shadow-card">
        <H3>{name}</H3>
        <div className="flex items-center text-sm font-normal text-neutral-60">
            <span className="text-orange-60 mr-2"><LinkIcon /></span>
            <span className="hover:underline cursors-pointer" id={id} data-tooltip-delay-hide={2000} >{shortUrl}</span>
            <Tooltip anchorId={id} events={['hover']}>
                <div className="flex text-sm cursor-pointer">
                    <span className="mr-1"><CopyIcon /></span>
                    <span onClick={() => {
                        navigator.clipboard.writeText(shortUrl);
                        customToast.success('Link copied');
                    }}>Copy link</span>
                    <span className="mx-2">|</span>
                    <a href={`https://${shortUrl}`} target="_blank" rel="noreferrer" className="flex text-white cursor-pointer"><span className="mr-1"><ShareIcon /></span> Open link</a>
                </div>
            </Tooltip>
        </div>
        <div className="flex items-center text-sm font-normal text-neutral-60 mt-0.5 cursor-pointer" onClick={() => setIsOpen(true)}>
            <span className="text-orange-60 mr-2"><QQCodeIcon /></span>
            Get menu QR code</div>
        <div className="flex mt-[18px] space-x-2.5">
            <div className="body-small bg-neutral-10 rounded-full px-3 py-1 text-sm">{categoryCount} {categoryCount > 1 ? 'categories' : 'category'}</div>
            <div className="body-small bg-neutral-10 rounded-full px-3 py-1 text-sm">{menuItemCount} item{menuItemCount > 1 && 's'}</div>
        </div>
        <div className="flex justify-end w-full mt-8">
            <div className={`flex space-x-2 max-w-[150px] w-full`}>
                <ButtonDefault onClick={() => {
                    window.open(`https://${shortUrl}`, '_blank');

                }} styles="bg-teal-10 !text-primary-light !min-h-[0] !border-teal-10 !max-h-[39px] w-[82px] !py-2 !text-sm">
                    Preview
                </ButtonDefault>
                <ButtonPrimary onClick={() => navigate('/places/' + id)} styles="!min-h-[0] !max-h-[39px] !py-2 w-[62px] !text-sm">
                    <div className='flex items-center justify-center'>Edit
                    </div>
                </ButtonPrimary>
            </div>
        </div>
        <Modal
            show={isOpen}
            onClose={() => { }}
            className={'max-w-[500px]'}
        >
            <button className="right-8 top-6 absolute text-neutral-60 hover:text-neutral-80" onClick={() => setIsOpen(false)}>
                <DeleteIcon />
            </button>
            <div className="text-center pt-6">
                <GetQRCode name={name} qrCode={qrCode} />
            </div>
        </Modal>
    </div>
}

export default PlaceCard;