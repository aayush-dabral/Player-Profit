import React from "react";
import tw from "tailwind-styled-components";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import { Zoom } from "@mui/material";

function Modal(props) {
    return (
        <div>
            <Dialog
                open={props.openModal || false}
                TransitionComponent={Zoom}
                onClose={props.closeModal}
            >
                <ContainerInner>
                    <div className="w-full h-auto flex flex-row justify-between items-start">
                        <p className={`${titleTxt} ${props.titleStyle}`}>{props?.title}</p>
                        <CloseBtn>
                            <IconButton onClick={props.closeModal} sx={{background: '#b8888861'}}>
                                <CloseIcon fontSize='medium' />
                            </IconButton>
                        </CloseBtn>
                    </div>
                    {props.children}
                </ContainerInner>
            </Dialog>
        </div>
    );
}

const ContainerInner = tw.div`
w-full 
h-full 
whitespace-pre-line 
flex 
flex-col 
md:pl-8 sm:pl-2 pl-[10px]
md:pr-8 sm:pr-2 pr-[6px]
sm:py-2  py-[5px] 
custom-scroll 
overflow-auto
items-center
`;
const titleTxt = `
pt-2
md:text-2xl sm:text-2xl text-2xl 
text-[black]
font-semibold
mb-8 
`;
const CloseBtn = tw.div`
w-[50px] 
h-[50px] 
md:mr-[-35px] mr-0 
mt-[-8px] 
flex 
items-start 
justify-end
`;
export default Modal;
