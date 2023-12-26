import React from "react";
import './TextInputStyle.css'
import { useDispatch } from "react-redux";
import { setModalIsOpen } from "../../state/modalState/isModalOpen";
import { addModalInfo } from "../../state/modalInfo/modalInfo";

const TextInput: React.FC = () => {
    const [startText, setStartText] = React.useState<string>('');
    const [writenText, setWritenText] = React.useState<string>('');
    const [msArray, setMsArray] = React.useState<any>([]);
    const [inputTimer, setInputTimer] = React.useState(0);
    const dispatch = useDispatch()

    function fetchText(){
        if(startText.length === 0){
            setInputTimer(Date.now())
            setWritenText('')
            dispatch(addModalInfo(undefined))
            fetch('https://fish-text.ru/get')
                .then(data => data.json())
                .then(data => setStartText(data.text))
        }
    }
    
    function validateInputing( inputText: string){
        if(inputText === startText[0]){
            const newText = startText.slice(1)

            setMsArray([...msArray, Date.now() - inputTimer])
            setStartText(newText)
            setWritenText(writenText + inputText)
            setInputTimer(Date.now())
            
            if(startText.length === 1){
                const time = msArray.reduce((accum: number, item: number) => accum += item, 0)
                dispatch(setModalIsOpen(true))
                dispatch(addModalInfo(time / 1000))

                setMsArray([])
                setWritenText('')
            }
        }
    }

    return (
        <div
            className="textInputContainer"
        >
            <input 
                type="text" 
                className="writenText"
                disabled
                value={writenText}
            />
            <div
                className="textInputHolder"
            >
                <input 
                    type="text" 
                    placeholder='Нажмите что бы начать' 
                    className="textInput"
                    value={startText}
                />

                <input 
                    type="text"
                    className="userInput"
                    value=''
                    onChange={(e) => validateInputing((e.target.value + '')[e.target.value.length - 1])}
                    onClick={fetchText}    
                />
            </div>
        </div>
    );
}
 
export default TextInput;