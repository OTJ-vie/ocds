
export const money = (amount) => {
    return Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(amount);
}

export const date = (d = null) => {
    if (d == undefined){
        return null;
    }
    let dd = new Date(d);

    return dd.toLocaleDateString().replace(/\//g, '-');
}

export const date_time = (d = null) => {
    if (d == undefined){
        return null;
    }

    return (new Date(d)).toLocaleString();
}