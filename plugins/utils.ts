export class Utils {
  xml2html(data: string, hightlight: boolean) {
    if (!data) {
      return null
    }
    data = data
      .split('&lt;')
      .join('<')
      .split('&gt;')
      .join('>')
      .replace('<head', '<p class="teiHead"><b')
      .replace('</head>', '</b></p>')
      .split('<lb/>')
      .join('<br/>')
      .split('<date')
      .join(`<span class="${hightlight ? 'teiDate' : ''}"`)
      .split('</date>')
      .join('</span>')
      .split('<persName')
      .join(`<span class="${hightlight ? 'teiPersName' : ''}"`)
      .split('</persName>')
      .join('</span>')
      .split('<place')
      .join(`<span class="${hightlight ? 'teiPlaceName' : ''}"`)
      .split('</placeName>')
      .join('</span>')
      .split('<time')
      .join(`<span class="${hightlight ? 'teiTime' : ''}"`)
      .split('</time>')
      .join('</span>')

    return data
  }

  removeHead(data: any) {
    data = data.replace(
      '<p class="teiHead">',
      '<p class="teiHead" style="display: none;">'
    )
    return data
  }

  formatArrayValue(arr: string[], delimiter: string = ', '): any {
    if (arr == null) {
      return ''
    }
    if (arr.length === 1) {
      return arr[0]
    } else {
      const value: string = arr.join(delimiter)
      return value
    }
  }

  wareki(text: any): any {
    if (!text) {
      return null
    }
    const spl = text.split('-')
    const year = spl[0]
    let month = 1
    if (spl.length > 1) {
      month = Number(spl[1])
    }
    let day = 1
    if (spl.length > 2) {
      day = Number(spl[2])
    }
    const date = new Date(year, month - 1, day, 0, 0, 0)
    const options: any = { era: 'long' }
    let wareki = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', options)
      .format(date)
      .split('年')[0]
      .split('/')[0]

    if (spl.length === 1) {
      // 年のみ指定の場合
      if (wareki === '慶応4') {
        wareki = '慶応4/明治元'
      } else if (wareki === '明治45') {
        wareki = '明治45/大正元'
      } else if (wareki === '大正15') {
        wareki = '大正15/昭和元'
      }
    }

    let result = year + '（' + wareki + '）年'
    if (spl.length > 1) {
      result += month + '月'
    }

    if (spl.length > 2) {
      result += day + '日'
    }

    return result
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
