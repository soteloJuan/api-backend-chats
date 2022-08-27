import jwt from 'jsonwebtoken';

export const GenerateJWT = async (idUsuario: string): Promise<string> => {

    const privateKey = process.env.SECRETORPRIVATEKEY || 'helloWorld';
    const payload = idUsuario;
    return  await jwt.sign({ payload }, privateKey, { expiresIn: '24h' });

};