import Json from '../src/json.js'
import { test } from '@japa/runner'

test.group('Json', () => {
  test('fromDbResponse', async ({ assert }) => {
    const entry = Json.fromDbResponse({
      telegram: 'https://waskamengaji.t.me',
      instagram: 'https://www.instagram.com/waskamengaji',
    })

    assert.isNotNull(entry)
    assert.instanceOf(entry, Json)

    const entry2 = Json.fromDbResponse(null)
    assert.isNull(entry2)
  })

  test('from', async ({ assert }) => {
    const entry = Json.from({
      telegram: 'https://waskamengaji.t.me',
      instagram: 'https://www.instagram.com/waskamengaji',
    })

    assert.isNotNull(entry)
    assert.instanceOf(entry, Json)
  })

  test('get', async ({ assert }) => {
    const entry = Json.fromDbResponse({
      telegram: 'https://waskamengaji.t.me',
      instagram: 'https://www.instagram.com/waskamengaji',
    })!

    assert.equal(entry.get('telegram'), 'https://waskamengaji.t.me')
    assert.equal(entry.get('instagram'), 'https://www.instagram.com/waskamengaji')
    assert.isUndefined(entry.get('facebook'))
  })

  test('getOrFail', async ({ assert }) => {
    const entry = Json.fromDbResponse({
      telegram: 'https://waskamengaji.t.me',
      instagram: 'https://www.instagram.com/waskamengaji',
    })!

    assert.equal(entry.getOrFail('telegram'), 'https://waskamengaji.t.me')
    assert.equal(entry.getOrFail('instagram'), 'https://www.instagram.com/waskamengaji')
    assert.throws(() => entry.getOrFail('facebook'))
  })

  test('toObject', async ({ assert }) => {
    const entry = Json.fromDbResponse({
      telegram: 'https://waskamengaji.t.me',
      instagram: 'https://www.instagram.com/waskamengaji',
    })!

    assert.deepEqual(entry.toObject(), {
      telegram: 'https://waskamengaji.t.me',
      instagram: 'https://www.instagram.com/waskamengaji',
    })
  })
})
