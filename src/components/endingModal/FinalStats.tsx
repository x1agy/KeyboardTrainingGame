import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { modalStyle } from '../../assest/modalStyleConstants';
import { addFinalModalIsOpen } from '../../state/modalInfo/modalInfo';

const FinalStats = () => {
    const isOpen = useSelector((state: RootState) => state.modalInfo.isOpen);
    const completedTime = useSelector((state: RootState) => state.modalInfo.completedTime);
    const totalAccuracy = useSelector((state: RootState) => state.modalInfo.totalAccuracy);
    const signsCount = useSelector((state: RootState) => state.modalInfo.signsCount);
    const signsSpeed = useSelector((state: RootState) => state.modalInfo.signsSpeed);
    const dispatch = useDispatch();

    return(
        <div
            style={{
                display: isOpen ? 'flex' : 'none',
                height:"100%",
                justifyContent:'center',
                alignItems:'center',
            }}
        >
            <div
                //@ts-ignore
                style={modalStyle.backgroundOpacityStyle}
            ></div>
            <div
                //@ts-ignore
                style={modalStyle.mainInfoContainerStyle}
            >
                <h1>Результат</h1>
                <table
                    cellSpacing={15}
                >
                    <tr>
                        <td>completed time {completedTime}s</td>
                        <td>accuracy {totalAccuracy}%</td>
                        <td>total signs {signsCount}</td>
                        <td>signs per second {signsSpeed}</td>
                    </tr>
                </table>
                <button
                    onClick={() => dispatch(addFinalModalIsOpen(false))}
                >Начать с начала</button>
            </div>
            
        </div>
    )
}

export default FinalStats