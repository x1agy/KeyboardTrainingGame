import React from "react";
import './TextInputStyle.css'
import { useDispatch } from "react-redux";
import { addCompleteTime, addSignsSpeed, addSignsCount, addTotalAccuracy, addFinalModalIsOpen } from "../../state/modalInfo/modalInfo";

const TextInput: React.FC = () => {

    const [startText, setStartText] = React.useState<string>('');
    const [writenText, setWritenText] = React.useState<string>('');
    const [msArray, setMsArray] = React.useState<number[]>([]);
    const [inputTimer, setInputTimer] = React.useState<number>(0);
    const [signsCount, setSignsCount] = React.useState<number>(0);
    const [missedSignsCount, setMissedSignsCount] = React.useState<number>(0);
    const [startDate, setStartDate] = React.useState<number>(0);

    const dispatch = useDispatch()

    function fetchText(){
        if(startText.length === 0){
            setInputTimer(Date.now())
            setWritenText('')
            setStartDate(Date.now())

            fetch('https://fish-text.ru/get')
                .then(data => data.json())
                .then(data => setStartText(data.text))
        }
    }
    
    function validateInputing( inputText: string){
        if(inputText === startText[0]){
            const newText = startText.slice(1)
            setSignsCount(prev => prev + 1)

            setMsArray([...msArray, Date.now() - inputTimer])
            setStartText(newText)
            setWritenText(writenText + inputText)
            setInputTimer(Date.now())
            
            if(startText.length === 1){
                stopGame('Escape')
            }
        }
        else{
            setMissedSignsCount(prev => prev + 1)
        }
    }

    function stopGame(key: string){
        if(key === 'Escape'){
            const time = msArray.reduce((accum: number, item: number) => accum += item, 0)

            dispatch(addCompleteTime((Date.now() - startDate) / 1000))
            // zero if signsCount === 0 else value
            dispatch(addSignsSpeed(Math.floor(signsCount ? (signsCount / (time / 1000)) : 0)))
            dispatch(addSignsCount(signsCount))
            // zeri if signsCount === 0 else value
            dispatch(addTotalAccuracy(Math.floor(signsCount ? (100 - (missedSignsCount * 100 / signsCount)) : 0)))
            dispatch(addFinalModalIsOpen(true))

            setMsArray([])
            setWritenText('')
            setStartText('')
            setSignsCount(0)
            setMissedSignsCount(0)
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
                readOnly
                value={writenText}
            />
            <div
                className="textInputHolder"
            >
                <input 
                    type="text" 
                    placeholder='Нажмите что бы начать' 
                    className="textInput"
                    readOnly
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