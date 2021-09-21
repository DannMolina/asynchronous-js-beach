const fs = require('fs');
const superagent = require('superagent');

/**
 * * then method introduced to JavaScript ES6
 */
// * callback hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     });
// });

// * promise 1st approach = consume
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     /**
//      * .then callback function is called as soon as the promise is done doing its work and has come back with the data
//      * and that data is then available as an argument to that callback
//      * begin: pending promise
//      * successfully gets the data: resolved promise
//      * resolved promise can either be fulfilled(usable result) or rejected(error)
//      * handles successful case
//      */
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     // * handles error or unsuccessful(rejected promise)
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// * promise 2nd approach = consume
const readFilePro = (file) => {
  // * var Promise: PromiseConstructor = introdude on ES6
  // * executor function
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data); // * pass result of the promise
    });
  });
};

// // * execute
// readFilePro(`${__dirname}/dog.txt`).then((data) => {
//   console.log(`Breed: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     /**
//      * .then callback function is called as soon as the promise is done doing its work and has come back with the data
//      * and that data is then available as an argument to that callback
//      * begin: pending promise
//      * successfully gets the data: resolved promise
//      * resolved promise can either be fulfilled(usable result) or rejected(error)
//      * handles successful case
//      */
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     // * handles error or unsuccessful(rejected promise)
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

// * build promise
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    // * executor function
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write a file');
      resolve('success');
    });
  });
};

// * execute 3rd approach
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   /**
//    * .then callback function is called as soon as the promise is done doing its work and has come back with the data
//    * and that data is then available as an argument to that callback
//    * begin: pending promise
//    * successfully gets the data: resolved promise
//    * resolved promise can either be fulfilled(usable result) or rejected(error)
//    * handles successful case
//    */
//   .then((res) => {
//     console.log(res.body.message);

//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random Dog image saved to file!');
//   })
//   // * handles error or unsuccessful(rejected promise)
//   .catch((err) => {
//     console.log(err.message);
//   });

/**
 *  async/await new feature introduce to Javascript ES8
 *  it makes our code more like synchronous code while being in fact still asynchronous behind the scene
 */

const getDogPic = async () => {
  try {
    // * inside async function we can always have one or more await expressions
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    // * single promise
    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // * multiple promise
    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    // * wait for multiple promises simulataneously
    // * get the resolve values of the 3 promises
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);

    // * map = loop through the all array
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    // console.log(res.body.message);

    // await writeFilePro('dog-img.txt', res.body.message); // * for single promise
    await writeFilePro('dog-img.txt', imgs.join('\n')); // * for multiple promise
    console.log('Random Dog image saved to file!');
  } catch (error) {
    throw error;
  }

  return '2: READY';
};

// * Immediately-invoked Function Expression (IIFE for friends)
(async () => {
  try {
    console.log('1: Will get dog pics!');
    const response = await getDogPic();
    console.log(response);
    console.log('3: Done getting dog pics!');
  } catch (error) {
    console.log('ERROR 💣');
  }
})();
