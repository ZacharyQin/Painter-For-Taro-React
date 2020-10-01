export default class LastMayday {
    palette() {
      return ({
        width: '654rpx',
        height: '700rpx',
        background: '#eee',
        views: [
          _textDecoration('overline', 0),
          _textDecoration('underline', 1),
          _textDecoration('line-through', 2),
          _textDecoration('overline underline line-through', 3, 'red'),
          {
            type: 'text',
            text: "fontWeight: 'bold'",
            css: [{
              top: `${startTop + 4 * gapSize}rpx`,
              fontWeight: 'bold',
            }, common],
          },
          {
            type: 'text',
            text: '我是把width设置为300rpx后，我就换行了',
            css: [{
              top: `${startTop + 5 * gapSize}rpx`,
              width: '400rpx',
            }, common],
          },
          {
            type: 'text',
            text: '我设置了maxLines为1，看看会产生什么效果',
            css: [{
              top: `${startTop + 7 * gapSize}rpx`,
              width: '400rpx',
              maxLines: 1,
            }, common],
          },
          {
            type: 'text',
            text: "textStyle: 'stroke'",
            css: [{
              top: `${startTop + 8 * gapSize}rpx`,
              textStyle: 'stroke',
              fontWeight: 'bold',
            }, common],
          },
        ],
      });
    }
  }
  
  const startTop = 50;
  const gapSize = 70;
  const common = {
    left: '20rpx',
    fontSize: '40rpx',
  };
  
  function _textDecoration(decoration, index, color?: String ) {
    return ({
      type: 'text',
      text: decoration,
      css: [{
        top: `${startTop + index * gapSize}rpx`,
        color: color,
        textDecoration: decoration,
      }, common],
    });
  }