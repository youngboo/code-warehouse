var codeWarehouse = require('../../build/index')
/**
 * 测试build
 */
describe('test basefactory', () => {
  test('basefactory require', () => {
    expect(codeWarehouse.query('123')).toBe(null)
  })
})
