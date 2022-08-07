//////////////////////////////////////////////////////////////////////////
// Not using "Moment" here, rather the built in "date" object.
module.exports = {
    // Function to format dates
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date).getFullYear()}`;
    },

    ///////////////////////////////////////////////////////////
    // Function to address pluralization 
    format_plural: (word, count) => {
        if (count !== 1) {
            return `${word}s`;          // return the plural of the word
        }
        //  Otherwise return singular
        return word;
    },

    //////////////////////////////////////////////////////////////////////////////
    // Function to address URL shortening
    format_url: url => {
        return url
            .replace('http://', '')         // replace string with nothing
            .replace('https://', '')        // replace string with nothing
            .replace('www.', '')            // replace string with nothing
            .split('/')[0]                  // split the string on "/" and take the 1st part
            .split('?')[0];                 // split the string on "?" and take the 1st part
    }
}


