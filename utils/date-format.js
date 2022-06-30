const dateFormat = time => {
    return new Date(time).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

module.exports = dateFormat;