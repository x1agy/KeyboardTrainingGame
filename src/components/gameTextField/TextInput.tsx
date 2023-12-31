import React from "react";
import './TextInputStyle.css'
import { useDispatch } from "react-redux";
import { addCompleteTime, addSignsSpeed, addSignsCount, addTotalAccuracy, addFinalModalIsOpen } from "../../state/modalInfo/modalInfo";

const TextInput: React.FC = () => {

    const [startText, setStartText] = React.useState<string>('');
    const [writenText, setWritenText] = React.useState<string>('');
    const [msArray, setMsArray] = React.useState<number[]>([]);
    const [inputTimer, setInputTimer] = React.useState<number>(0);
    let signsCount = 0;
    let missedSignsCount = 0;

    const dispatch = useDispatch()

    function fetchText(){
        if(startText.length === 0){
            setInputTimer(Date.now())
            setWritenText('')

            dispatch(addCompleteTime(undefined))
            dispatch(addSignsSpeed(undefined))
            dispatch(addSignsCount(undefined))
            dispatch(addTotalAccuracy(undefined))

            fetch('https://fish-text.ru/get')
                .then(data => data.json())
                .then(data => setStartText(data.text))
        }
    }
    
    function validateInputing( inputText: string){
        if(inputText === startText[0]){
            const newText = startText.slice(1)
            signsCount++;
            missedSignsCount++;

            setMsArray([...msArray, Date.now() - inputTimer])
            setStartText(newText)
            setWritenText(writenText + inputText)
            setInputTimer(Date.now())
            
            if(startText.length === 1){
                stopGame('Escape')
            }
        }
        else{
            missedSignsCount++;
        }
    }

    function stopGame(key: string){
        if(key === 'Escape'){
            const time = msArray.reduce((accum: number, item: number) => accum += item, 0)

            dispatch(addCompleteTime(time / 1000))
            dispatch(addSignsSpeed(signsCount / (time / 1000)))
            dispatch(addSignsCount(signsCount))
            dispatch(addTotalAccuracy(100 - (missedSignsCount * 100 / signsCount)))
            dispatch(addFinalModalIsOpen(true))

            setMsArray([])
            setWritenText('')
            setStartText('')
            signsCount = 0;
            missedSignsCount = 0;
        }
    }    

    return (
        <div
            className="textInputContainer"
            onKeyUp={(e) => stopGame(e.key)}
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