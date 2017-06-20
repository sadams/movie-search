module.exports = function(obj) {
  let handler = {
    get(target, propKey) {
      const origMethod = target[propKey];
      return (...args) => {
        return new Promise((resolve, reject) => {
          // other callback->promise conversion libs seemed to break when referencing 'this' (e.g. promisify-node).
          // i think it's because they bind 'this' vs the target 'obj' which breaks internal references in the target libs.
          origMethod.call(obj, ...args, (err, ...results) => {
            if (err) {
              reject(err)
            } else {
              resolve(...results)
            }
          })
        });
      }
    }
  };
  return new Proxy(obj, handler);
}