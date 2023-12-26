import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setModalIsOpen } from "../../state/modalState/isModalOpen";

const modalStyle = {
    backgroundOpacityStyle:{
        position:"absolute",
        width:"100%",
        height:"100%",
        backgroundColor:"gray",
        opacity:"70%",
        zIndex:'5',
    },
    mainInfoContainerStyle:{
        position:'absolute',
        width:'800px',
        height:'400px',
        left:'30%',
        top:'20%',
        backgroundColor:'white',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        opacity:'100%',
        zIndex:'20'
    }
}

const Modal = () => {

    const isOpen = useSelector((state: RootState) => state.isModalOpen.value)
    const modalInfoCompletedTime = useSelector((state: RootState) => state.modalInfo.completedTime)
    const dispatch = useDispatch()

    return (
        <div
            style={{
                display: isOpen ? 'flex' : 'none'
            }}
        >
            <div
                // @ts-ignore
                style={modalStyle.backgroundOpacityStyle}
            >

            </div>
            <div
                // @ts-ignore
                style={modalStyle.mainInfoContainerStyle}
            >
                <h1>{modalInfoCompletedTime ? `Потраченное время: ${modalInfoCompletedTime} s` : 'Тренажёр печати'}</h1>

                <button
                    onClick={() => {
                        dispatch(setModalIsOpen(false))
                    }}
                >Начать</button>
            </div>
        </div>
    );
}
 
export default Modal;