
export const OnlyLetterInText = (text: string) => {

    const RegExp = /^[A-Za-z]+$/;
    const textWithoutSpaces = text.replace(/ /g, "");
    return (textWithoutSpaces.match(RegExp)) ? (true) : (false);

};


export const IsAValidEmail = (email: string) => {
    
    const  RegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    return (email.match(RegExp)) ? (true) : (false);

};