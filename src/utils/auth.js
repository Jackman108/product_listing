import md5 from 'md5';

const PASSWORD = 'Valantis';

export const generateAuthString = () => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    return md5(`${PASSWORD}_${timestamp}`);
};