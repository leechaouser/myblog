import marked from 'marked' // .md
import hljs from 'highlight.js'
import xss from 'xss' // 处理页面xss攻击

// 转化 md 语法为 html
export const translateMarkdown = (plainText, isGuardXss = false) => {
    return marked(isGuardXss ? xss(plainText) : plainText, {
      renderer: new marked.Renderer(),
      gfm: true, // 允许 Git Hub标准的markdown.  // 默认为true
      pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。 // 默认为false
      sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签） // 默认为false
      tables: true, // 允许支持表格语法。该选项要求 gfm 为true。  // 默认为true
      breaks: true, // 允许回车换行。该选项要求 gfm 为true。 // 默认为false
      smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉. // 默认为false
      smartypants: true, // 使用更为时髦的标点，比如在引用语法中加入破折号。  // 默认为false
      xhtml: false,
      highlight: function(code) {
        // 语法高亮
        return hljs.highlightAuto(code).value
      }
    })
  }

  // 获取 url query 参数
  export const decodeQuery = url => {
    let params = {}
    const paramsStr = url.replace(/\.*\?/, '')
    paramsStr.split('&').forEach(v => {
      const d = v.split('=')
      if (d[1] && d[0]) params[d[0]] = d[1]
    })
    return params
  }