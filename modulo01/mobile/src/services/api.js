import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.0.10:3333"
});

export default api;

/*
    IOS com emulador: localhost
    IOS com físico: ip da máquina
    Android com emulador: localhost (adb reverse tcp:333 tcp:333)
    Android com emulador: 10.0.2.2 (Android Studio)
    Android com emulador: 10.0.3.2 (Genymotion)
    Android com físico: IP da máquina
*/