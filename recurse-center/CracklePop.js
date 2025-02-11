// write a program that prints out the numbers 1 to 100 (inclusive)
// if the number is divisible by 3, print Crackle instead of the number
// if the number is dividible by 5, print Pop
// if it's divisible by both 3 and 5, print CracklePop

// inclusive: including 1 and 100
// devisible: capable of being divided by another number without a remainder

console.log(`██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗    ████████╗ ██████╗ 
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝    ╚══██╔══╝██╔═══██╗
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗         ██║   ██║   ██║
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝         ██║   ██║   ██║
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗       ██║   ╚██████╔╝
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝       ╚═╝    ╚═════╝ 
                                                                                    `);
console.log(` ██████╗██████╗  █████╗  ██████╗██╗  ██╗██╗     ███████╗██████╗  ██████╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██║     ██╔════╝██╔══██╗██╔═══██╗██╔══██╗
██║     ██████╔╝███████║██║     █████╔╝ ██║     █████╗  ██████╔╝██║   ██║██████╔╝
██║     ██╔══██╗██╔══██║██║     ██╔═██╗ ██║     ██╔══╝  ██╔═══╝ ██║   ██║██╔═══╝ 
╚██████╗██║  ██║██║  ██║╚██████╗██║  ██╗███████╗███████╗██║     ╚██████╔╝██║     
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝     
                                                                                 `);
// let i = 1; initialize the counter i to 1
// i <= 100; is the condition that keeps the loop running as long as it's true
// i++ increments i by 1 after each iteration
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    // if number divides into 3 and 5 evenly
    console.log("CracklePop"); // print CracklePop
  } else if (i % 3 === 0) {
    // if the number is divisible by 3
    console.log("Crackle"); // print Crackle
  } else if (i % 5 === 0) {
    // if number modulo 5
    console.log("Pop"); // print Pop
  } else {
    console.log(i); // print the number
  }
}
console.log("That's all folks!");

// node CracklePop.js
