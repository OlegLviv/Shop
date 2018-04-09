export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const objectToArrayKeys = (obj) => {
    if (!obj)
        return;
    return Object.keys(obj).map(i => i);
};

export const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

export const clearObjectProps = (obj) => {
    if (!obj)
        return;
    Object.keys(obj).map(i => delete obj[i]);
};

export const createProductQueryByObject = (obj) => {
    if (!obj)
        return;
    return Object.keys(obj).map(i => i.concat(`=${obj[i]}`)).join(';');
};

