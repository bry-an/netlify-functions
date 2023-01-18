const _curry = (length, combinedArgs, fn) => (...args) => {
  return combinedArgs.length + args.length >= length
    ? fn.apply(this, combinedArgs.concat(args))
    : _curry(length, combinedArgs.concat(args), fn)
}

const curry = (fn) => (...args) => args.length === fn.length
  ? fn.apply(this, args)
  : _curry(fn.length, args, fn)

const isNil = (x) => x === undefined || x === null

const tail = (a) => a.length ? a.slice(1) : []
const head = (a) => a.length ? a[0] : null
const last = (a) => a.length ? head(a.slice(-1)) : null

const equals = curry((a, b) => a === b)
const always = (x) => () => x;

const cond = curry((arr, arg) => {
  if (isNil(arr.length)) return undefined
  return head(head(arr)).call(this, arg)
    ? last(head(arr)).call(this, arg)
    : cond(tail(arr), arg)
})

const groupBy = curry((groupingFn, list) => {
	const result = {};

    list.forEach(element => {
        const stringVal = groupingFn(element)
        if (stringVal in result) {
            result[stringVal].push(element)
        } else {
            result[stringVal] = [element]
        }
    })
   return result; 
})

const prop = curry((key, obj) => obj && obj[key] || null);

export const groupByProp = (property, arr) => groupBy(prop(property), arr)
