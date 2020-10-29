//////////////////////////////////////////////////////////////////////////
// Not using "Moment" here, rather the built in "date" object.
module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },

    ///////////////////////////////////////////////////////////
    // Function to address pluralization 
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;          // return the plural of the word
        }
        //  Otherwise return singular
        return word;
    },

    //////////////////////////////////////////////////////////////////////////////
    // Function to address URL shortening
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('https://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0];
    }
}


