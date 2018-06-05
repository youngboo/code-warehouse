//var base = require('../../src/code-warehouse')
//var codeWarehouse = require('../../src/index')
import codeWarehouse from '../../src/index'
/**
 * 测试base工厂
 */
describe('test basefactory', () => {
  test('basefactory require', () => {
    expect(codeWarehouse.query.name).toBe('query')
  })
})
