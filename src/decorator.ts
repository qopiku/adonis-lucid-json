import Json from './json.js'
import { BaseModel } from '@adonisjs/lucid/orm'
import { ColumnOptions } from '@adonisjs/lucid/types/model'

export interface TranslatedOptions {}

export type TranslatedDecorator = (
  options?: TranslatedOptions & Partial<ColumnOptions>
) => <TKey extends string, TTarget extends { [K in TKey]: Json }>(
  target: TTarget,
  propertyKey: TKey
) => void

const decorator: TranslatedDecorator = (options) => {
  return function decorateAsColumn(target: any, property: string) {
    const Model = target.constructor as typeof BaseModel
    Model.boot()

    const { ...columnOptions } = options ?? {}

    Model.$addColumn(property, {
      consume: (value: any) => (value ? Json.fromDbResponse(value) : null),
      prepare: (value: Json) => (value ? JSON.stringify(value.toObject()) : null),
      serialize: (value: Json) => (value ? value.toObject() : null),
      ...columnOptions,
    })
  }
}

export default decorator
