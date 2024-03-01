import md5 from 'md5';

const PASSWORD = process.env.REACT_APP_PASSWORD;

export const generateAuthString = () => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    return md5(`${PASSWORD}_${timestamp}`);
};