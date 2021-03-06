import {useEffect, useState} from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [ws] = useState(new WebSocket('wss://arcane-forest-49375.herokuapp.com/'));
    const [formData, setFormData] = useState({name: '', message: ''});


    // useEffect(() => {
    //     setWs(new WebSocket('wss://arcane-forest-49375.herokuapp.com/'));
    // });

    useEffect(() => {
        ws.addEventListener('message', (evt) => {
            const data = JSON.parse(evt.data);
            setMessages((prevState) => ([...prevState, data]));
        });
    }, []);

    const handleChangeFormData = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
        })
    };

    const handleSendMessage = (evt) => {
        evt.preventDefault();
        ws.send(JSON.stringify({
            name: formData.name,
            message: formData.message,
        }));
        setFormData({
            ...formData,
            message: '',
        })
    };

    return (
        <main>
            <h1>Chat App</h1>
            <form onSubmit={handleSendMessage}>
                <input name={'name'} onChange={handleChangeFormData} value={formData.name}/>
                <textarea name={'message'} onChange={handleChangeFormData} value={formData.message}/>
                <input type={'submit'}/>
                <h2>Messages:</h2>
                <ul>
                    {
                        messages.map(message => (
                            <li><i>{message.name}</i>: {message.message}</li>
                        ))
                    }
                </ul>
            </form>
        </main>
    );
}

export default App;