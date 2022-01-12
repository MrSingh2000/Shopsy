import { toast } from "react-toastify";

export function bufferToBase64(img) {
    let buf = new Uint8Array(img);
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

export function notify(message, type, id = "productAdded") {
    if (type === "success") {
        toast.success(message);
    }
    else if (type === "error") {
        toast.error(message);
    }
    else if (type === "info") {
        toast.info(message, {
            toastId: id
        });
    }
    else if (type === "warning") {
        toast.warn(message);
    }
    else {
        toast(message);
    }
}

export async function verifyToken(authToken) {
    let url = `${process.env.REACT_APP_HOST}/api/auth/getuser`;
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'auth-token': authToken,
        }
    });
    let data = await res.json();
    if (data.error) {
        return false;
    }
    else {
        return true;
    }
}