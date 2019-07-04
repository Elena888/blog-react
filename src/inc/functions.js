export function validate(title, content) {
    const errors = [];
    if (title.length === 0) {
        errors.title = 'Title can\'t be empty';
    }

    if (content.length < 6) {
        errors.content = 'Content should be at least 6 characters long'
    }
    return errors;
}
export function filter(arr) {
    for(var i = 0; i < arr.length; i++){

        var symbols =  ["." , "#" , "$" , "[" , "]"]
        for(var j = 0; j < symbols.length; j++){
            if(arr[i] === symbols[j]){
                arr.splice(i, 1);
                i--;
            }
        }
    }
    return arr
}