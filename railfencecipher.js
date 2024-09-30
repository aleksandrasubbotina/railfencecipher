const encode = (message, rails) => {
    let result = [];
    let count = (rails * 2 - 2); // calculate step for chars in first row
  
    // iterate through chars in first row
    for (let i = 0; i < message.length; i += count) {
      // cut substring from one first row letter to another
      const substr = message.slice(i, i + count);
      // add new char to first row
      result[0] ? result[0] += substr[0] : result[0] = substr[0];
  
      let a = 1;
      let b = count - 1;
  
      // iterate through chars of substring going from the start (a) and from the end (b)
      while (a < b) {
        // stop if no more letters left in substring
        if (substr[a] === undefined) break;
        // add chars to the next rows
        result[a] ? result[a] += substr[a] + (substr[b] || ''): result[a] = substr[a] + (substr[b] || '');
        a += 1;
        b -= 1;
      }
  
      // add char to the last row
      if (substr[a] !== undefined) {
        result[a] ? result[a] += substr[a] : result[a] = substr[a];
      }
    }
  
    // join array of strings into one string
    return result.join('');
};
  
  
const decode = (string, rails) => {
    let cipher = string.split(''); // make cipher array from a string
    let result = [];
    
    let count = (rails * 2 - 2); // calculate step for chars in first row
    
    // iterate through rows (rails) in a cipher message
    for (let i = 0; i < rails; i ++) {
      // iterate through substrings (divided by step) in cipher message
      for (let j = 0; j < string.length; j += count) {
        // add chars from the start and from the end of substring to result,
        // taking them from cipher array
        if (j + i < string.length) result[j + i] = cipher.shift();
        if (j + count - i < string.length && i > 0 && j + count - i !== j + i) result[j + count - i] = cipher.shift();
      }
    }
    // join array of chars into string
    return result.join('');
};