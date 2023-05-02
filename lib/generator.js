import { createRandomPicker, randomInt } from "./random.js"

/**
 * generate()函数 根据传入的 title 和 语料库 生成文章内容
 */
export function generate(title, {
  corpus,
  min = 6000,
  max = 10000
}) {
  // 设置文章长度
  const articleLength = randomInt(min, max)
  const {famous, bosh_before, bosh, conclude, said} = corpus
  const [pickFamous, pickBoshBefore, pickBosh, pickConclude, pickSaid] = [famous, bosh_before, bosh, conclude, said].map(item => createRandomPicker(item))

  const article = []
  let totalLength = 0

  while(totalLength < articleLength) {
    let section = '' // 添加段落
    const sectionLength = randomInt(200, 500) // 段落长度设置为200到500之间
    // 如果当前段落小于段落长度，或者当前段落不是以 句号。 或者 问号？ 结尾
    while(section.length < sectionLength || !/[。？]$/.test(section)) {
      // 取一个0到100的随机数
      const n = randomInt(0, 100)
      if(n < 20) {
        // 生成名人名言
        section += sentence(pickFamous, {said: pickSaid, conclude: pickConclude})
      } else if(n < 50) {
        // 生成一个带有前置从句的废话
        section += sentence(pickBoshBefore, {title}) + sentence(pickBosh, {title})
      } else {
        // 生成一个不带有前置从句的废话
        section += sentence(pickBosh, {title})
      }
    }
    // 段落结束，更新总长度
    totalLength += section.length
    // 将段落存放到文章列表中
    article.push(section)
  }
  // 段落数组形式返回
  return article
}

/**
 * 生成一个句子
 * @param {*} pick 
 * @param {*} replacer 对象形式，例如：{said: pickSaid, conclude: pickConclude}
 * @returns 
 */
function sentence(pick, replacer) {
  let res = pick()
  for(let key in replacer) {
    res = res.replace(
      new RegExp(`{{${key}}}`, 'g'),
      typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]
    )
  }
  return res
}