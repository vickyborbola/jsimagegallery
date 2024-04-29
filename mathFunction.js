function strToMath(str) {
    if (typeof str !== 'string') {
      return `Error. This is not a string!`;
    }
    
    let total = 0;
   
    str = str.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
        
    str.forEach(function (item){
      total += parseFloat(item);
    });
      
    let isEven = (total % 2 === 0) ? true : false;
    
    return isEven;
  }
  
  let string = '2+112+48-14+43-361-0+454';
  console.log(
    'Total is even? '+ strToMath(string)
  )