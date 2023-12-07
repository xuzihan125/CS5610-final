export const removeTags = (str) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();
    // Regular expression to identify HTML tags in string & replace them
    return str.replace(/(<([^>]+)>)/ig, '');
}

export const trimString = (str, length) => {
    // Trim the string to the maximum length if the string is longer than the maximum length, otherwise return the string
    return str.length > length ? str.substring(0, length) + '...' : str;
}

