/**
 * randomInt() 返回一个大于等于 min ，小于 max 的整数
 */

export function randomInt(min, max) {
  const random = Math.floor(Math.random() * (max - min))
  const res = min + random
  return res
}

/**
 * randomPick() 从数组中随机选择元素
 * 进阶要求：不能连续选取同一个元素
 */

// 下面这种实现有两个缺点：
// 1.初始在数组末位的那个元素，第一次肯定不会被取到，破坏了随机性 
// 2.每次取完内容有个交换数组元素的操作，改变了数组本身，如果我们要用这个数组做其他操作，就可能会影响到别的操作的结果。
// export function randomPick(arr) {
//   const lastIndex = arr.length - 1
//   const index = randomInt(0, lastIndex)
//   [arr[index], arr[lastIndex]] = [arr[lastIndex], arr[index]]
//   return arr[index]
// }

// 利用【高阶函数】解决：
export function createRandomPicker(arr) {
  arr = [...arr] // copy 数组，以免修改原始数据
  function randomPick() {
    const lastIndex = arr.length - 1
    const index = randomInt(0, lastIndex)
    const picked = arr[index];
    [arr[index], arr[lastIndex]] = [arr[lastIndex], arr[index]]
    return picked
  }
  randomPick() // 抛弃第一次选择结果
  return randomPick
}