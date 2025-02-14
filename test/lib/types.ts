import { pgMeta } from './utils'

test('list', async () => {
  const res = await pgMeta.types.list()
  expect(res.data?.find(({ name }) => name === 'user_status')).toMatchInlineSnapshot(
    { id: expect.any(Number) },
    `
    {
      "comment": null,
      "enums": [
        "ACTIVE",
        "INACTIVE",
      ],
      "format": "user_status",
      "id": Any<Number>,
      "name": "user_status",
      "schema": "public",
    }
  `
  )
})

test('list types with included schemas', async () => {
  let res = await pgMeta.types.list({
    includedSchemas: ['public'],
  })

  expect(res.data?.length).toBeGreaterThan(0)

  res.data?.forEach((type) => {
    expect(type.schema).toBe('public')
  })
})

test('list types with excluded schemas', async () => {
  let res = await pgMeta.types.list({
    excludedSchemas: ['public'],
  })

  res.data?.forEach((type) => {
    expect(type.schema).not.toBe('public')
  })
})

test('list types with excluded schemas and include System Schemas', async () => {
  let res = await pgMeta.types.list({
    excludedSchemas: ['public'],
    includeSystemSchemas: true,
  })

  expect(res.data?.length).toBeGreaterThan(0)

  res.data?.forEach((type) => {
    expect(type.schema).not.toBe('public')
  })
})
